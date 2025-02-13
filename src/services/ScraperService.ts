import puppeteer, { Browser, Page } from "puppeteer";

import { LoginDTO } from "../dtos/Auth/LoginDTO";
import { ScrapUtils } from "../utils/ScrapUtils";

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

    public async login(loginDto: LoginDTO) {
        await this.page.goto(this.url);

        await ScrapUtils.typeInput(this.page, "#vSIS_USUARIOID", loginDto.username);
        await ScrapUtils.typeInput(this.page, "#vSIS_USUARIOSENHA", loginDto.password);

        await this.page.click("[name='BTCONFIRMA']");
        await this.page.waitForNavigation({ waitUntil: 'networkidle0' });

        const isLoginSuccessfull = await this.page.evaluate(() => {
            return document.querySelector("#TABLE5") !== null;
        })
    }

    public async getAbsencesInfo(loginDto: LoginDTO) {
        this.login(loginDto);
    }
}