
export type Ranks= ("Going"|"Ended"|"Paused")
export type Status= ("Going"|"Ended"|"Paused"|"NotYetStarted"|"Decoded")
export type Messages= string 
export type Lines = Lines[]

export default class TendersDto {

    public Id!: number;
    public EndDate?: string;
    public StartDate?: string;
    public Name?: string;
    public TenderNumber!: string;
    public IsQualityTender?: boolean;
    public CurrencyId?:string;
    public Time?: number ;
    public TotalToLead?: number | undefined;
    public RankInfo!: Ranks;// האם מכרז מוביל או לא
    public UserLastPropositionTotal?: number
    public Statuses!: Status;
    public Messages?:Messages[];
    public IsFemaleOwner?: boolean;
    public HasUsersWithFemaleOwner?: boolean;

 
}



