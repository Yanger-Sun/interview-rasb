interface Project {
    /**
     * 项目名称
     */
    name: string,
    /**
     * 公司
     */
    company: string,
    /**
     * 合同金额
     */
    contractAmount: number,
    /**
     * 开始日期
     */
    startDate: string,
    /**
     * 结束日期
     */
    endDate: string,
    /**
     * 开发者
     */
    developer: string,
    /**
     * 成本列表
     */
    costList: {
        /**
         * 名称
         */
        name: string,
        /**
         * 金额
         */
        amount: number,
        /**
         * 占比
         */
        proportion: number
    }[]

    /**
     * 项目状态
     */
    statusList:{status:string,date:string}[]
}
