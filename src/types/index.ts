export interface ChinaTotal {
	noInfect: number
	localConfirmH5: number
	localWzzAdd: number
	highRiskAreaNum: number
	suspect: number
	dead: number
	deadAdd: number
	confirm: number
	local_acc_confirm: number
	confirmAdd: number
	mtime: string
	mediumRiskAreaNum: number
	localConfirm: number
	mRiskTime: string
	nowSevere: number
	importedCase: number
	showLocalConfirm: number
	showlocalinfeciton: number
	noInfectH5: number
	nowLocalWzz: number
	localConfirmAdd: number
	nowConfirm: number
	heal: number
  }
  
  export interface ChinaAdd {
	dead: number
	nowConfirm: number
	suspect: number
	importedCase: number
	noInfectH5: number
	confirm: number
	heal: number
	nowSevere: number
	noInfect: number
	localConfirm: number
	localConfirmH5: number
  }
  
  export interface ShowAddSwitch {
	confirm: boolean
	dead: boolean
	noInfect: boolean
	localConfirm: boolean
	all: boolean
	suspect: boolean
	heal: boolean
	nowConfirm: boolean
	nowSevere: boolean
	importedCase: boolean
	localinfeciton: boolean
  }
  
  export interface Today {
	confirm: number
	isUpdated: boolean
  }
  
  export interface Total {
	dead: number
	showHeal: boolean
	mediumRiskAreaNum: number
	continueDayZeroLocalConfirm: number
	confirm: number
	continueDayZeroLocalConfirmAdd: number
	nowConfirm: number
	showRate: boolean
	heal: number
	highRiskAreaNum: number
	wzz: number
	provinceLocalConfirm: number
	mtime: string
	adcode: string
  }
  
  export interface Today {
	abroad_confirm_add: number
	dead_add: number
	confirm: number
	confirmCuts: number
	isUpdated: boolean
	tip: string
	wzz_add: number
	local_confirm_add: number
  }
  
  export interface Total {
	showHeal: boolean
	adcode: string
	mediumRiskAreaNum: number
	continueDayZeroLocalConfirmAdd: number
	nowConfirm: number
	confirm: number
	dead: number
	showRate: boolean
	heal: number
	provinceLocalConfirm: number
	continueDayZeroConfirmAdd: number
	continueDayZeroConfirm: number
	wzz: number
	highRiskAreaNum: number
	mtime: string
  }
  
  export interface Today {
	confirm: number
	confirmCuts: number
	isUpdated: boolean
	wzz_add: string
	local_confirm_add: number
  }
  
  export interface Total {
	showRate: boolean
	nowConfirm: number
	dead: number
	adcode: string
	confirm: number
	provinceLocalConfirm: number
	highRiskAreaNum: number
	continueDayZeroLocalConfirmAdd: number
	mtime: string
	heal: number
	showHeal: boolean
	wzz: number
	mediumRiskAreaNum: number
	continueDayZeroLocalConfirm: number
  }
  
  export interface Children {
	name: string
	adcode: string
	date: string
	today: Today
	total: Total
  }
  
  export interface Children {
	date: string
	today: Today
	total: Total
	children: Children[]
	name: string
	adcode: string
  }
  
  export interface AreaTree {
	today: Today
	total: Total
	children: Children[]
	name: string
  }
  
  export interface Diseaseh5Shelf {
	lastUpdateTime: string
	chinaTotal: ChinaTotal
	chinaAdd: ChinaAdd
	isShowAdd: boolean
	showAddSwitch: ShowAddSwitch
	areaTree: AreaTree[]
  }
  
  export interface StatisGradeCityDetail {
	nowConfirm: number
	confirm: number
	syear: number
	dead: number
	heal: number
	grade: string
	date: string
	mtime: string
	province: string
	city: string
	confirmAdd: number
	sdate: string
	wzz_add: string
  }
  
  export interface RootObject {
	diseaseh5Shelf: Diseaseh5Shelf
	statisGradeCityDetail: StatisGradeCityDetail[]
  }