"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAgent = void 0;
const settings = require('electron-settings');
class UserAgent {
    constructor(subSeed) {
        this._phones = [
            "Linux; Android 6.0.1; SM-G900F Build/MMB29M",
            "Linux; Android 7.0; SAMSUNG-SM-G891A Build/NRD90M",
            "Linux; Android 7.0; SM-G930S Build/NRD90M",
            "Linux; Android 7.1.2; Nexus 5X Build/N2G47O",
            "Linux; Android 7.0; SM-G930S Build/NRD90M",
            "Linux; Android 6.0.1; XT1254 Build/MCG24.251-5-5",
            "Linux; Android 8.0.0; SM-G960F Build/R16NW",
            "Linux; Android 7.0; SM-G892A Build/NRD90M",
            "Linux; Android 7.0; SM-G930VC Build/NRD90M",
            "Linux; Android 7.0; ZTE A2017U Build/NRD90M",
            "Linux; Android 7.0; Nexus 5X Build/NRD90M",
            "Linux; Android 6.0.1; SM-G920V Build/MMB29K",
            "Linux; Android 6.0.1; Z988 Build/MMB29M",
            "Linux; Android 7.0; Nexus 5X Build/NRD90M",
            "Linux; Android 6.0.1; SM-G928X Build/LMY47X",
            "Linux; Android 6.0.1; Nexus 6P Build/MMB29P",
            "Linux; Android 7.1.1; K92 Build/NMF26V",
            "Linux; Android 7.1.1; G8231 Build/41.2.A.0.219",
            "Linux; Android 6.0; HTC One X10 Build/MRA58K",
            "Linux; Android 7.1.1; ONEPLUS A5000 Build/NMF26X",
            "Linux; Android 5.1.1; SM-G928X Build/LMY47X",
            "Linux; Android 6.0.1; Nexus 6P Build/MMB29P",
            "Linux; Android 6.0.1; E6653 Build/32.2.A.0.253",
            "Linux; Android 6.0.1; E6653 Build/32.2.A.0.253",
            "Linux; Android 6.0.1; SM-G920V Build/MMB29K",
            "Linux; Android 7.0; LG-H840 Build/NRD90U"
        ];
        this._tablets = [
            "Linux; Android 6.0.1; DSGP771 Build/32.2.A.0.253",
            "Linux; Android 5.1; LPT_200AR Build/LMY47I",
            "Linux; Android 5.1.1; HUAWEI M2-801L Build/HUAWEIM2-801L",
            "Linux; Android 7.0; SM-T827R4 Build/NRD90M",
            "Linux; Android 7.0; Pixel C Build/NRD90M",
            "Linux; Android 7.1.2; SAMSUNG SM-T700 Build/N2G47E",
            "Linux; Android 7.1.2; SM-T805 Build/N2G47O",
            "Linux; Android 6.0.1; SAMSUNG SM-T805 Build/MMB29K",
            "Linux; Android 6.0.1; SM-T705Y Build/MMB29K",
            "Linux; Android 6.0.1; SM-T705 Build/MMB29K",
            "Linux; Android 6.0.1; SM-T800 Build/MMB29U",
            "Linux; Android 6.0.1; SM-T800 Build/MMB29K",
            "Linux; Android 6.0.1; SGP771 Build/32.2.A.0.253",
            "Linux; Android 5.1.1; SHIELD Tablet Build/LMY48C",
            "Linux; Android 6.0; SHIELD Tablet K1 Build/MRA58K",
            "Linux; Android 7.0; SHIELD Tablet K1 Build/NRD90M",
            "Linux; Android 6.0.1; SHIELD Tablet K1 Build/MRA58K",
            "Linux; Android 5.1; SM-T330 Build/IMM76D",
            "Linux; Android 7.0; SAMSUNG SM-T820 Build/NRD90M",
            "Linux; Android 6.0; BTV-DL09 Build/HUAWEIBEETHOVEN-DL09"
        ];
        this._chromes = [
            "Chrome/85.0.4183.81",
            "Chrome/84.0.4147.89",
            "Chrome/83.0.4103.106",
            "Chrome/82.0.4084.0",
            "Chrome/81.0.4044.138",
            "Chrome/80.0.3987.163",
            "Chrome/79.0.3945.88",
            "Chrome/78.0.3904.108",
            "Chrome/77.0.3865.90",
            "Chrome/76.0.3809.100",
            "Chrome/75.0.3770.142",
            "Chrome/74.0.3729.131",
            "Chrome/73.0.3683.103",
            "Chrome/72.0.3626.121",
            "Chrome/71.0.3578.80",
            "Chrome/71.0.3578.98",
            "Chrome/70.0.3538.102",
            "Chrome/70.0.3538.80",
            "Chrome/70.0.3538.67",
            "Chrome/70.0.3538.77",
            "Chrome/70.0.3538.110"
        ];
        this.subSeed = subSeed;
        this.generateUserAgentString();
    }
    getString() {
        return this.userAgentString + " DofusTouch Client " + settings.getSync('appVersion');
    }
    generateUserAgentString() {
        let mac = settings.getSync("macAddress");
        let seed = 0, i, chr;
        for (i = 0; i < mac.length; i++) {
            chr = mac.charCodeAt(i);
            seed = ((seed << 5) - seed) + chr;
            seed |= 0; // Convert to 32bit integer
        }
        seed = Math.abs(seed);
        seed += this.subSeed * Math.floor(seed / Math.pow(10, Math.floor(Math.log10(seed))));
        let deviceType = seed % 2 == 0 ? 'phone' : 'tablet';
        let devicesList = deviceType == 'phone' ? this._phones : this._tablets;
        let randomDevice = seed % devicesList.length;
        let randomChrome = seed % this._chromes.length;
        let device = devicesList[randomDevice];
        let chrome = this._chromes[randomChrome];
        chrome = chrome.replace(/(\w+\/)((\d+\.){3})(\d+)/, "$1$2" + Math.round(seed % 90 + 60));
        this.userAgentString = "Mozilla/5.0 (" + device + "; wv)"
            + " AppleWebKit/537.36 (KHTML, like Gecko) "
            + chrome
            + " Mobile Safari/537.36";
    }
}
exports.UserAgent = UserAgent;
//# sourceMappingURL=user-agent.js.map