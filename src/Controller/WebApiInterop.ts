
export class WebApiInterop
{
    private m_sApiRoot: string;
    private m_authToken: string = "";

    constructor(sApiRoot: string)
    {
        this.m_sApiRoot = sApiRoot;
    }

    get isAuthenticated(): boolean { return this.m_authToken !== ""; }

    async FetchJson(sApi: string, args: any[]): Promise<any>
    {
        let rgs: string[] = [];

        for (var arg of args)
        {
            for (var key in arg)
            {
                rgs.push(`${key}=${arg[key]}`);
            }
        }

        let sCall = this.m_sApiRoot.concat("/", sApi, "?", rgs.join("&"));

        const headerVals: any =
        {
            'Content-Type': 'application/json',
            'Accept': 'application/json' // ,
        };

        if (this.m_authToken !== "")
            headerVals['Authorization'] = "Bearer " + this.m_authToken;

        let result: Response = await fetch(
            sCall,
            {
                mode: 'cors',
                headers: headerVals
            });

        if (result.status >= 400)
            throw new Error(`FetchJson failed: (${result.status})`);

        return await result.json();
    }

    async FetchJsonWithPost(sApi: string, args: any): Promise<any>
    {
        let sCall = this.m_sApiRoot.concat("/", sApi);

        const headerVals: any =
        {
            'Content-Type': 'application/json',
            'Accept': 'application/json' // ,
        };

        if (this.m_authToken !== "")
            headerVals['Authorization'] = "Bearer " + this.m_authToken;

        let result: Response = await fetch(
            sCall,
            {
                method: 'POST',
                mode: 'cors',
                headers: headerVals,
                body: JSON.stringify(args)
            });

        if (result.status >= 400)
            throw new Error(`FetchJson failed: (${result.status})`);

        return await result.json();
    }

    async FetchPost<T>(sApi: string, args: any): Promise<T>
    {
        var json = await this.FetchJsonWithPost(sApi, args);

        return json as T;
    }

    async Fetch<T>(sApi: string, args: any[]): Promise<T>
    {
        var json = await this.FetchJson(sApi, args);

        return json as T;
    }

    removeAuth()
    {
        this.m_authToken = "";
    }

    setAuth(token: string)
    {
        this.m_authToken = token;
    }
}