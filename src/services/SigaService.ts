import puppeteer, { Browser, Page } from "puppeteer";

import { LoginDTO } from "../dtos/Auth/LoginDTO";

export class SigaService {
    private url: string = "https://siga.cps.sp.gov.br/aluno/login.aspx";
    private browser!: Browser;
    private page!: Page;

    public async initPage() {
        const browser = await puppeteer.launch({ headless: false });
        this.browser = browser;
        this.page = await browser.newPage();
    }

    public async login(loginDto: LoginDTO) {
        await this.page.goto(this.url);
        await this.page.type("#vSIS_USUARIOID", loginDto.username);
        await this.page.type("#vSIS_USUARIOSENHA", loginDto.password);
        await this.page.click("button[name='BTCONFIRMA']");
        await this.page.waitForNavigation({ waitUntil: 'networkidle0' });
        const isLoginSuccessfull = await this.page.evaluate(() => {
            return document.querySelector("#TABLE5") !== null;
        })

        if(isLoginSuccessfull) {
            console.log("LOGOUU")
        } else {
            console.log("NAO LOGOU INFENROOOOO")
        }

        await this.browser.close();
    }

    public async getAbsencesInfo(loginDto: LoginDTO) {
        this.login(loginDto);
    }
}