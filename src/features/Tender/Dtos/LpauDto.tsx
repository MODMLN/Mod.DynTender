
interface ApprovalMessages
{
    Id: number, 
    Text: string,
}

export type Ranks= ("Going"|"Ended"|"Frozen")
export type Status= ("Going"|"Ended"|"Paused"|"NotYetStarted"|"Decoded")


export default class LpauDto {
    public UserIsDisabled?: boolean;
    public UserNominalToLead?: boolean;
    public UserTotalToLead?: number;
    public StatusId?:Status;
    public UserLastPropositionTotal?: number;
    public UserLastPropositionTotalPerUnit?: number;
    public UserLastPropositionTotalWithoutBenefits?: number;
    public UserLastPropositionRank?: number;
    public LeadingPropositions?: number;
    public Total?: number;
    public DisplayRank?: boolean;
    public Time?: string;
    public EndTime?: string;
    public ManualProposition?: boolean;
    public IsWinning?: boolean;
    public WinningInfo?:string;
    public BenefitType?:string;
    public MadeInIsrael?: boolean;
    public LocalWork?: boolean;
    public TotalLocationBenefit?: number;
    public TotalMadeInIsrael?: number;
    public TotalLocationBenefitPerUnit?: number;
    public TotalMadeInIsraelPerUnit?: number;
    public ServerTime?: string;
    public NeedApprovalMessages?:ApprovalMessages[];
}