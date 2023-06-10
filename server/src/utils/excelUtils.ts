import * as xlsx from 'xlsx';

export function parseExcel(filePath: string): any[] {
    const workbook = xlsx.readFile(filePath);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

    const parsedData = jsonData.slice(1).map((row: any) => {
        const [itemNo, description, unit, qty, rate, amount] = row;
        return {
            itemNo,
            description,
            unit,
            qty,
            rate,
            amount,
        };
    });

    return parsedData;
}