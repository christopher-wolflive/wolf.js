class GroupMemberAdditionalInformation {
    Hash;
    NicknameShort;
    OnlineState;
    Privileges;
}

class GroupMember {
    
    /**
     * 
     */
    Id;
    
    /**
     * 
     */
    Capabilities;
    
    /**
     * 
     */
    AdditionalInfo = new GroupMemberAdditionalInformation;
}