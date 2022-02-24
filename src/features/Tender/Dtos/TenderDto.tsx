import TenderLineDto from './TenderLineDto'

export type Ranks= ("Going"|"Ended"|"Frozen")
export type Status= ("Going"|"Ended"|"Paused"|"NotYetStarted"|"Decoded")
export type Messages= string 

export default class TenderDto {
    public Id!: number;
    public IsDisplayLeadingPropositions?: boolean;
    public IsMinPreferred?: boolean;
    public IsServiceTender?: boolean;
    public NumberOfWinner!: number | undefined;
    public Name?:string;
    public HasUsersWithFemaleOwner?: boolean;
    public MultipaleFactor!: number | undefined;
    public CurrencyId?:string;
    public AmountSign?:string;
    public IsPercentageCalculation?: boolean;
    public Time!: number | undefined;
    public ExtendDuration!: number | undefined;
    public TenderQualityGradePercent!: number | undefined;
    public SupplierQualityGradePercent!: number | undefined;
    public Statuses!:Status;
    public RankInfo!:Ranks;
    public TenderNumber!: number | undefined;
    public TotalToLead!: number | undefined;
    public Lines?:TenderLineDto[] | undefined;
    public Messages?:string[] | undefined;
    public IsFemaleOwner?: boolean;
    public itemsNumber!: number | undefined; 
}