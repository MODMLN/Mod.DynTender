export type Roles = ("Administrator" | "Proposer");

export default class UsersDto {

    public userId?: number | undefined;;
    public userName?: string;
    public UserFullName?: string;
    public Role: Roles | undefined;

}