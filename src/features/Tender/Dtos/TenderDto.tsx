import TenderLineDto from './TenderLineDto'

export type Ranks= ("Active"|"Ended"|"Frozen")
export type Status= ("Active"|"Ended"|"Frozen"|"NotStarted")
export type Messages= string 

export default class TenderDto {
    public Id!: number;
    public IsDisplayLeadingPropositions?: boolean;
    public IsMinPreferred?: boolean;
    public IsServiceTender?: boolean;
    public NumberOfWinner!: number;
    public Name?:string;
    public HasUsersWithFemaleOwner?: boolean;
    public MultipaleFactor!: number;
    public CurrencyId?:string;
    public AmountSign?:string;
    public IsPercentageCalculation?: boolean;
    public Time!: number;
    public ExtendDuratio!: number;
    public TenderQualityGradePercent!: number;
    public SupplierQualityGradePercent!: number;
    public Statuses!:Status;
    public RankInfo!:Ranks;
    public TenderNumber!: number;
    public TotalToLead!: number;
    public Lines?:TenderLineDto[];
    public Messages?:string[]
    public itemsNumber: number;
}