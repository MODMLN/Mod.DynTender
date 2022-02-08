
export default class TenderLineDto {
   
    public RequiredAmount!: number;// מספר יחידות
    public Price!: number;//מחיר ליחידה
    public InitialPrice!: number;
    public DiscountPercent!: number;
    public TenderLineId!: number;
    public TenderLineName?:string;//כותרת
    public MaxPrice!: number;
    public MinPrice!: number;
    public PriceStep!: number;//מדרגת הצעה
    public TotalPrice!: number;
    public TotalPriceForDisplay!: number;//סה"כ
    public PreviousPrice!: number;
    public IsCotsOrUsg?: boolean;
    public IsraeliContent!: number;
    public NonUsPercent!: number;
    public Index!: number;
    public TotalWithoutBenefits!: number;
    public BenefitType?:string;
    public TotalWithLocationBenefit!: number;
    public TotalForLocalWork!: number;
    public CurrencyId?:string;
}
