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
    private browser!: Browser;
    private page!: Page;
    private isAuth: boolean = false;

    public async initPage() {
        if (!this.browser) {
            this.browser = await puppeteer.launch({ headless: false});
        }
    
        if (!this.page) {
            this.page = await this.browser.newPage();
        }
    }

    public async closePage() {
        await this.page.close();
        await this.browser.close();
    }

    public async login(loginDto: LoginDTO): Promise<boolean> {
        if(this.isAuth) {
            return this.isAuth;
        }

        await this.page.goto(this.url);

        await ScrapUtils.typeInput(this.page, "#vSIS_USUARIOID", loginDto.username);
        await ScrapUtils.typeInput(this.page, "#vSIS_USUARIOSENHA", loginDto.password);

        await this.page.click("[name='BTCONFIRMA']");
        await this.page.waitForNavigation({ waitUntil: 'networkidle0' });

        const isLoginSuccessfull = await this.page.evaluate(() => {
            return document.querySelector("#TABLE5") !== null;
        })

        this.isAuth = isLoginSuccessfull;

        return isLoginSuccessfull;
    }

    public async getAbsencesInfo(loginDto: LoginDTO): Promise<AbsenceDTO[] | undefined> {
        await this.initPage();

        if(await this.login(loginDto)) {
            const disciplines = await this.getDisciplinesInfo(loginDto);
            if(!disciplines) {
                throw new Error();
            }

            await this.page.click("#ygtvlabelel11Span");
            await this.page.waitForSelector("#Grid1ContainerDiv", { visible: true });
            const tableLines = await this.page.$$(".GridClearOdd");

            const absencesList: AbsenceDTO[] = [];

            for (const line of tableLines) {
                const textContents: string[] = [];

                const items = await line.$$("td");

                for (const element of items) {
                    const text = await this.page.evaluate(el => el.textContent?.trim(), element);
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

    public async getDisciplinesInfo(loginDto: LoginDTO): Promise<DisciplineDTO[] | undefined> {
        await this.initPage();

        if(await this.login(loginDto)) {
            await this.page.click("#ygtvlabelel9Span");

            await this.page.waitForSelector("#Grid1ContainerTbl", { visible: true });
            const tableLines = await this.page.$$("#Grid1ContainerTbl .GridClearOdd");

            const disciplineList: DisciplineDTO[] = [];

            for (const line of tableLines) {
                const textContents: string[] = [];

                const items = await line.$$("td");

                for (const element of items) {
                    const text = await this.page.evaluate(el => el.textContent?.trim(), element);
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

    public async getClasstimeInfo(loginDto: LoginDTO): Promise<DayTimesDTO[] | undefined> {
        await this.initPage();
        
        if(await this.login(loginDto)) {
            const disciplines = await this.getDisciplinesInfo(loginDto);
            if(!disciplines) {
                throw new Error();
            }

            const dayTimes: DayTimesDTO[] = [];

            await this.page.waitForSelector(".GridClear", { visible: true });
            const tables = await this.page.$$("#TABLE3 .GridClear");
            const tableTitles = await this.page.$$("#TABLE3 .TextBlock");

            let i = 0;
            for(const table of tables) {
                const tableLines = await table.$$("tr");
                const tableLinesWithoutFirst = tableLines.slice(1);

                const classtimeList: ClasstimeDTO[] = [];

                for (const line of tableLinesWithoutFirst) {
                    const textContents: string[] = [];
    
                    const cells = await line.$$("td");
    
                    for (const textElement of cells) {
                        const text = await this.page.evaluate(el => el.textContent?.trim(), textElement);
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

                const day = await this.page.evaluate(el => el.textContent?.trim(), tableTitles[i]) as DayEnum;
                dayTimes.push(new DayTimesDTO(day, classtimeList));
                i++;
            }
            return dayTimes;
        }
    }
}