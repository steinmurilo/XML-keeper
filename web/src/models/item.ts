
export interface TableItem {
    id: number; 
    cnf: string; 
    idNF: string, 
    dhEmi: string, 
    chf: string, 
    cuf: string, 
    cnpjEmit: string, 
    xfantEmit: string,
    cnpjDest: string, 
    xnomeDest: string, 
    vtotTrib: number, 
    vnf: number
}

export interface TablePaginationInfo {
    first: boolean,
    last: boolean,
    pageNumber: number,
    totalPage: number,
}