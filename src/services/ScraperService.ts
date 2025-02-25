import puppeteer, { Browser, Page } from "puppeteer";

import { LoginDTO } from "../dtos/Auth/LoginDTO";
import { ScrapUtils } from "../utils/ScrapUtils";
import { AbsenceDTO } from "../dtos/Absences/AbsenceDTO";
import { DisciplineDTO } from "../dtos/Disciplines/DisciplineDTO";
import { ClasstimeDTO } from "../dtos/Classtime/ClasstimeDTO";
import { DayEnum } from "../enums/DayEnum";
import { DayTimesDTO } from "../dtos/Classtime/DayTimesDTO";

export class ScraperService {

    private url: string = "https://siga.cps.sp.gov.br/aluno/login.aspx";

    public async main(loginDto: LoginDTO) {
        const browser: Browser = await puppeteer.launch({ headless: false});
        const page: Page = await browser.newPage();

        const isAuth = await this.login(page, loginDto);
        const disciplines = await this.getDisciplinesInfo(page, isAuth);
        const absences = await this.getAbsencesInfo(page, isAuth, disciplines!);
        const classtimes = await this.getClasstimeInfo(page, isAuth, disciplines!);

        await page.close();
        await browser.close();

        return [
            absences,
            disciplines,
            classtimes
        ]
    }

    public async login(page: Page, loginDto: LoginDTO): Promise<boolean> {
        await page.goto(this.url);

        await ScrapUtils.typeInput(page, "#vSIS_USUARIOID", loginDto.username);
        await ScrapUtils.typeInput(page, "#vSIS_USUARIOSENHA", loginDto.password);

        await page.click("[name='BTCONFIRMA']");
        await page.waitForNavigation({ waitUntil: 'networkidle0' });

        const isLoginSuccessfull = await page.evaluate(() => {
            return document.querySelector("#TABLE5") !== null;
        })

        return isLoginSuccessfull;
    }

    public async getAbsencesInfo(page: Page, isAuth: boolean, disciplines: DisciplineDTO[]): Promise<AbsenceDTO[] | undefined> {
        if(isAuth) {
            await page.click("#ygtvlabelel11Span");
            await page.waitForSelector("#Grid1ContainerDiv", { visible: true });
            const tableLines = await page.$$(".GridClearOdd");

            const absencesList: AbsenceDTO[] = [];

            for (const line of tableLines) {
                const textContents: string[] = [];

                const items = await line.$$("td");

                for (const element of items) {
                    const text = await page.evaluate(el => el.textContent?.trim(), element);
                    if(text) {
                        textContents.push(text);
                    }
                };

                const presences = Number(textContents[2]);
                const absences = Number(textContents[3]);
                const disciplineName = textContents[1];

                const absenceDto = new AbsenceDTO(presences, absences);
                
                const discipline = disciplines.find(discipline => discipline.name.includes(disciplineName));
                if(discipline) {
                    absenceDto.discipline = discipline;
                }

                absencesList.push(absenceDto);
            };

            return absencesList;
        }
    }

    public async getDisciplinesInfo(page: Page, isAuth: boolean): Promise<DisciplineDTO[] | undefined> {
        if(isAuth) {
            await page.click("#ygtvlabelel9Span");

            await page.waitForSelector("#Grid1ContainerTbl", { visible: true });
            const tableLines = await page.$$("#Grid1ContainerTbl .GridClearOdd");

            const disciplineList: DisciplineDTO[] = [];

            for (const line of tableLines) {
                const textContents: string[] = [];

                const items = await line.$$("td");

                for (const element of items) {
                    const text = await page.evaluate(el => el.textContent?.trim(), element);
                    if(text) {
                        textContents.push(text);
                    }
                };

                const cod = textContents[0];
                const name = textContents[1].split("-")[0].trim();
                const teacher = textContents[3];

                disciplineList.push(new DisciplineDTO(cod, name, teacher));
            };

            return disciplineList;
        }
    }

    public async getClasstimeInfo(page: Page, isAuth: boolean, disciplines: DisciplineDTO[]): Promise<DayTimesDTO[] | undefined> {        
        if(isAuth) {
            const dayTimes: DayTimesDTO[] = [];

            await page.waitForSelector(".GridClear", { visible: true });
            const tables = await page.$$("#TABLE3 .GridClear");
            const tableTitles = await page.$$("#TABLE3 .TextBlock");

            let i = 0;
            for(const table of tables) {
                const tableLines = await table.$$("tr");
                const tableLinesWithoutFirst = tableLines.slice(1);

                const classtimeList: ClasstimeDTO[] = [];

                for (const line of tableLinesWithoutFirst) {
                    const textContents: string[] = [];
    
                    const cells = await line.$$("td");
    
                    for (const textElement of cells) {
                        const text = await page.evaluate(el => el.textContent?.trim(), textElement);
                        if(text) {
                            textContents.push(text);
                        }
                    };
    
                    const startTime = textContents[0].split("-")[0].trim();
                    const endTime = textContents[0].split("-")[1].trim();
                    const disciplineCod = textContents[1].trim();
                    const classtimeDto = new ClasstimeDTO(startTime, endTime);
    
                    const discipline = disciplines.find(discipline => discipline.cod.includes(disciplineCod));
                    if(discipline) {
                        classtimeDto.discipline = discipline;
                    }
    
                    classtimeList.push(classtimeDto);
                };

                const day = await page.evaluate(el => el.textContent?.trim(), tableTitles[i]) as DayEnum;
                dayTimes.push(new DayTimesDTO(day, classtimeList));
                i++;
            }
            return dayTimes;
        }
    }
}