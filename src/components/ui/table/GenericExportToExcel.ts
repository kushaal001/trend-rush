import { utils, writeFile } from "xlsx";

// Function to export an HTML table to an Excel file
export default function exportToExcel(tableName: string, fileName: string, excludeColumns: number[]): void {
  // Get the table element by its ID
  const table = document.getElementById(tableName) as HTMLTableElement;

  // If the table is not found, log an error and return
  if (!table) {
    console.error("Table not found");
    return;
  }

  const rows = table.rows; // Get all rows from the table
  const exportData: any[] = []; // Initialize an array to hold the data to be exported

  // Loop through each row in the table
  for (let i = 0; i < rows.length; i++) {
    const cells: HTMLCollectionOf<HTMLTableCellElement> = rows[i].cells; // Get all cells in the current row
    const rowData: any[] = []; // Initialize an array to hold the data for the current row

    // Loop through each cell in the row
    for (let j = 0; j < cells.length; j++) {
      // Skip columns that are in the excludeColumns array
      if (!excludeColumns.includes(j)) {
        const cell: HTMLTableCellElement = cells[j];

        // Check if the cell contains an <img> element
        const img = cell.querySelector("img");
        if (img) {
          const imgSrc = img.getAttribute("src");
          if (imgSrc) {
            // Add the image link to the row data
            rowData.push({ l: { Target: imgSrc, Tooltip: "Image Link" }, v: imgSrc });
            continue;
          }
        }

        // Check if the cell contains an <a> element
        const link = cell.querySelector("a");
        if (link) {
          const href = link.getAttribute("href");
          if (href) {
            // Add the hyperlink to the row data
            rowData.push({ l: { Target: href, Tooltip: "Hyperlink" }, v: href });
            continue;
          }
        }

        // Check if the cell content itself is a URL
        const textContent = cell.innerText.trim();
        const isUrl = textContent.startsWith("http://") || textContent.startsWith("https://");
        if (isUrl) {
          // Add the direct URL to the row data
          rowData.push({ l: { Target: textContent, Tooltip: "Direct URL" }, v: textContent });
          continue;
        }

        // Fallback to plain text if none of the above conditions match
        rowData.push(textContent);
      }
    }
    // Add the row data to the export data array
    exportData.push(rowData);
  }

  // Convert the extracted data to a worksheet
  const worksheet = utils.aoa_to_sheet(exportData);

  // Add hyperlink information to the worksheet cells
  exportData.forEach((row: (string | { l: { Target: string; Tooltip: string }; v: string })[], rowIndex) => {
    row.forEach((cell, cellIndex) => {
      if (typeof cell === "object" && cell?.l) {
        const cellAddress = utils.encode_cell({ r: rowIndex, c: cellIndex });
        worksheet[cellAddress].l = cell.l; // Add hyperlink info
        worksheet[cellAddress].v = cell.v; // Set visible text
      }
    });
  });

  // Create a new workbook and append the worksheet to it
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Write the workbook to a file with the specified file name
  writeFile(workbook, `${fileName}.xlsx`);
}
