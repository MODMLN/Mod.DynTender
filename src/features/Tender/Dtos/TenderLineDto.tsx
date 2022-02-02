
export default class TenderLineDto {
   
    public RequiredAmount!: number;
    public Price!: number;
    public InitialPrice!: number;
    public DiscountPercent!: number;
    public TenderLineId!: number;
    public TenderLineName?:string;
    public MaxPrice!: number;
    public MinPrice!: number;
    public PriceStep!: number;
    public TotalPrice!: number;
    public TotalPriceForDisplay!: number;
    public PreviousPrice!: number;
    public IsCotsOrUsg?: boolean;
    public IsraeliContent!: number;
    public NonUsPercent!: number;
    public Index!: number;
    public TotalWithoutBenefits!: number;
    public BenefitType?:string;
    public TotalWithLocationBenefit!: number;
    public TotalForLocalWork!: number;
}
