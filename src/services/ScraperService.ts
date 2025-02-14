import puppeteer, { Browser, Page } from "puppeteer";

import { LoginDTO } from "../dtos/Auth/LoginDTO";
import { ScrapUtils } from "../utils/ScrapUtils";
import { AbsenceDTO } from "../dtos/Absences/AbsenceDTO";
import { DisciplineDTO } from "../dtos/Disciplines/DisciplineDTO";

export class ScraperService {
    private url: string = "https://siga.cps.sp.gov.br/aluno/login.aspx";
    private browser!: Browser;
    private page!: Page;
    private isAuth: boolean = false;

    constructor() {
        this.initPage().catch(console.error);;
    }

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
        if(await this.login(loginDto)) {
            const disciplines = await this.getDisciplinesInfo(loginDto);
            if(!disciplines) {
                return undefined;
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

                const absenceDto = new AbsenceDTO(Number(textContents[2]), Number(textContents[3]), textContents[1]);
                
                const discipline = disciplines.find(discipline => discipline.name.includes(absenceDto.discipline));
                if(discipline) {
                    absenceDto.teacher = discipline.teacher;
                }

                absencesList.push(absenceDto);
            };

            return absencesList;
        }
    }

    public async getDisciplinesInfo(loginDto: LoginDTO): Promise<DisciplineDTO[] | undefined> {
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

                disciplineList.push(new DisciplineDTO(textContents[0], textContents[1].split("-")[0].trim(), textContents[3]));
            };

            return disciplineList;
        }
    }
}