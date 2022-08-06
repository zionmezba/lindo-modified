export declare class UserAgent {
    private subSeed;
    private userAgentString;
    constructor(subSeed: number);
    private _phones;
    private _tablets;
    private _chromes;
    getString(): string;
    private generateUserAgentString;
}
