export interface IMessege {
    isOpen?:boolean ; //()=>boolean
    messege?:string;
}

export declare type nullable<T> = (T | null | undefined);

export class TenderLineDto { 
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
    public IsPercentageCalculation?: boolean;
    public ErrorMsgIsOpen?: boolean ;
    public ErrorMsgMessege?: string ;
    public ErrorMsg!: IMessege;
    public isUpdated?: boolean ;
}
