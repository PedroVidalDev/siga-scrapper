import puppeteer, { Browser, Page } from "puppeteer";

import { LoginDTO } from "../dtos/Auth/LoginDTO";
import { ScrapUtils } from "../utils/ScrapUtils";
import { AbsencesDTO } from "../dtos/Absences/AbsencesDTO";

export class ScraperService {
    private url: string = "https://siga.cps.sp.gov.br/aluno/login.aspx";
    private browser!: Browser;
    private page!: Page;

    constructor() {
        this.initPage();
    }

    public async initPage() {
        const browser = await puppeteer.launch({ headless: false });
        this.browser = browser;
        this.page = await browser.newPage();
    }

    public async login(loginDto: LoginDTO): Promise<boolean> {
        await this.page.goto(this.url);

        await ScrapUtils.typeInput(this.page, "#vSIS_USUARIOID", loginDto.username);
        await ScrapUtils.typeInput(this.page, "#vSIS_USUARIOSENHA", loginDto.password);

        await this.page.click("[name='BTCONFIRMA']");
        await this.page.waitForNavigation({ waitUntil: 'networkidle0' });

        const isLoginSuccessfull = await this.page.evaluate(() => {
            return document.querySelector("#TABLE5") !== null;
        })

        return isLoginSuccessfull;
    }

    public async getAbsencesInfo(loginDto: LoginDTO) {
        if(await this.login(loginDto)) {
            await this.page.click("#ygtvlabelel11Span");
            await this.page.waitForNavigation({ waitUntil: 'networkidle0' });

            const tableLines = await this.page.$$(".GridClearOdd");

            const absencesList: AbsencesDTO[] = [];

            for (const line of tableLines) {
                const textContents: string[] = [];

                const items = await line.$$("td");

                for (const element of items) {
                    const text = await this.page.evaluate(el => el.textContent?.trim(), element);
                    if(text) {
                        textContents.push(text);
                    }
                };

                absencesList.push(new AbsencesDTO(Number(textContents[2]), Number(textContents[3]), textContents[1], "teste"));
            };

            return absencesList;
        }
    }
}