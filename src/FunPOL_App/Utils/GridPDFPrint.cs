//using System;
//using System.Data;
//using System.Data.Common;
//using System.Collections.Generic;
//using System.IO;
//using iTextSharp.text.pdf;
//using iTextSharp.text;
//using System.Linq.Dynamic;
//using System.Linq;
//using System.Threading.Tasks;


//namespace FunPol.Mvc.Utils
//{
//    public static class GridPDFPrint
//    {

//        /// <summary>
//        /// Generate the bytes of PDF file.
//        /// </summary>
//        /// <typeparam name="T">Type of model</typeparam>
//        /// <param name="data">Model to convert PDF</param>
//        /// <param name="ImagePath">To get the sort indicator image server path</param>
//        /// <param name="sortColumn">Current sorted column</param>
//        /// <param name="currentSort">Current Sort(Asc or Desc)</param>
//        /// <param name="mygrid">Grid control</param>
//        /// <returns></returns>
//        public static byte[] ToPdf<T>(this IQueryable<T> data, string ImagePath, string sortColumn, string currentSort, GridViewModel mygrid)
//        {
//            System.Drawing.ColorConverter objConverter = new System.Drawing.ColorConverter();
//            BaseColor headerRowColor = new BaseColor(System.Drawing.ColorTranslator.FromHtml(mygrid.HeaderBackgroundColor));
//            BaseColor oddRowColor = new BaseColor(System.Drawing.ColorTranslator.FromHtml(mygrid.RowBackgroundColor));
//            BaseColor evenRowColor = new BaseColor((System.Drawing.Color)objConverter.ConvertFromString(mygrid.AlternatingRowBackgroundColor));
//            //List<GridColumnViewModel> ExportColumns = mygrid.GridColumns.Where(c => c.GridColumnType == ColumnType.Link ||
//            //                                                                              c.GridColumnType == ColumnType.Text).Select(c => c).ToList();

//            //string sExportColumns = string.Join(",", ExportColumns.Select(c => c.ColumnName));
//            //var objExportData = data.Select("new(" + sExportColumns + ")");

//            List<string> ExportColumns = new List<string>() { "S.No", "Name", "Location", "Email" };

//            string sExportColumns = string.Join(",", ExportColumns);
//            var objExportData = data.Select("new(" + sExportColumns + ")");


//            Paragraph PdfTitle = new Paragraph(mygrid.PDFPrintTitle);
//            PdfTitle.Alignment = Element.ALIGN_CENTER;

//            PdfPTable PdfTable = new PdfPTable(ExportColumns.Count());         //Set columns count
//            PdfPCell cell = null;
//            Font headerFont = FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 10);  //Set header font
//            Font rowFont = FontFactory.GetFont("ARIAL", 8);                         //Set row font
//            PdfTable.HeaderRows = 1;                                                //Set header rows visible in all pages
//            Document pdfDoc = new Document(PageSize.A4, 10f, 10f, 10f, 0f);         //Create PdfDoc

//            MemoryStream memoryStream = new MemoryStream();                         //Memory stream to convert the pdfDoc to bytes
//            PdfWriter writer = PdfWriter.GetInstance(pdfDoc, memoryStream);
//            Image image;            //To show the Sort icon in the header rows

//            var imageSortAscPath = ImagePath + "/Images/asc.gif";
//            var imageSortDescPath = ImagePath + "/Images/desc.gif";

//            List<int> columnWidths = new List<int>();
//            //Adding Headers
//            foreach (var columns in ExportColumns)
//            {
//                //int iWdthFromControl = Convert.ToInt16(columns.ColumnWidth?.ToLower().Replace("px", ""));
//                int iWdthFromControl = 5;
//                columnWidths.Add(iWdthFromControl > 0 ? iWdthFromControl : 100);

//                cell = new PdfPCell();
//                cell.Padding = 1;

//                Paragraph headerParagraph = new Paragraph(new Phrase(new Chunk(columns.HeaderText, headerFont)));       //Create the Paragraph. Add the header text and image in paragraph for good align.
//                headerParagraph.Alignment = Element.ALIGN_CENTER;           //Set the paragraph alignment to center

//                //Check if the SortColumn is current header
//                if (sortColumn.Equals(columns.ColumnName))
//                {                               //Add sorting icon
//                    if (currentSort.ToLower().Equals("asc"))
//                        image = Image.GetInstance(imageSortAscPath);
//                    else
//                        image = Image.GetInstance(imageSortDescPath);

//                    image.ScaleToFit(15f, 15f);

//                    image.Alignment = Image.ALIGN_MIDDLE | Image.ALIGN_TOP;

//                    headerParagraph.Add(new Chunk(image, 0, 0));            //Add the image to paragraph
//                }

//                if (columns.TextAlign.ToUpper() == "CENTER")
//                {
//                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
//                }
//                else if (columns.TextAlign.ToUpper() == "RIGHT")
//                {
//                    cell.HorizontalAlignment = Element.ALIGN_RIGHT;
//                }
//                else
//                {
//                    cell.HorizontalAlignment = Element.ALIGN_LEFT;
//                }

//                cell.VerticalAlignment = Element.ALIGN_TOP;

//                cell.AddElement(headerParagraph);           //Add the paragraph to cell

//                cell.BackgroundColor = headerRowColor;
//                PdfTable.AddCell(cell);
//            }

//            int iRowIndex = 0;                 //To check the current row is odd or even

//            foreach (var item in ExportColumns)
//            {
//                BaseColor objRowColor = IsEven(iRowIndex) ? evenRowColor : oddRowColor;      //Get the background color odd or even

//                foreach (var columns in ExportColumns)         //Adds the value from the list to table cell
//                {
//                    string value = Convert.ToString(item.GetType().GetProperty(item).GetValue(item, null));
//                    cell = new PdfPCell(new Phrase(new Chunk(value, rowFont)));
//                    cell.BackgroundColor = objRowColor;

//                    PdfTable.AddCell(cell);
//                }

//                iRowIndex++;
//            }

//            PdfTable.SetWidths(columnWidths.ToArray());
//            PdfTable.SpacingBefore = 15f; // Give some space after the text or it may overlap the table

//            pdfDoc.Open();          //Open the pdfDoc
//            pdfDoc.Add(PdfTitle);      // add pdf title to the document
//            pdfDoc.Add(PdfTable);   // add pdf table to the document

//            pdfDoc.Close();

//            byte[] bytes = memoryStream.ToArray();
//            //memoryStream.Close();
//            memoryStream.Dispose();
//            return bytes;
//        }

//        /// <summary>
//        /// Check the no is even or odd
//        /// </summary>
//        /// <param name="no">no to check</param>
//        /// <returns>boolean (even or odd)</returns>
//        private static bool IsEven(int no)
//        {
//            return no % 2 == 0;
//        }





//    }

//    /// <summary>
//    /// Model for Re-Usable Grid Control
//    /// </summary>
//    public class GridViewModel
//    {
//        /// <summary>
//        /// Visible column list.
//        /// </summary>
//        public IEnumerable<GridColumnViewModel> GridColumns { get; set; }
//        /// <summary>
//        /// Data Source has to bind with the grid.
//        /// </summary>
//        public IEnumerable<object> Items { get; set; }
//        /// <summary>
//        /// Specify grid row background color.
//        /// </summary>
//        public string RowBackgroundColor { get; set; }
//        /// <summary>
//        /// Specify grid alternating row background color.
//        /// </summary>
//        public string AlternatingRowBackgroundColor { get; set; }
//        /// <summary>
//        /// Specify grid header background color.
//        /// </summary>
//        public string HeaderBackgroundColor { get; set; }
//        /// <summary>
//        /// Specify the Controller name to get the datasource for grid.
//        /// </summary>
//        public string ControllerName { get; set; }
//        /// <summary>
//        /// Specify the Action name to get the datasource for grid.
//        /// </summary>
//        public string ActionName { get; set; }
//        /// <summary>
//        /// This class is meant for Edit the row.
//        /// </summary>        
//        public ActionTarget EditRowAction { get; set; }
//        public ActionTarget ExportToPDFAction { get; set; }
//        public ActionTarget ExportToCSVAction { get; set; }
//        /// <summary>
//        /// This class is meant for delete the row.
//        /// </summary>
//        public ActionTarget DeleteSelectedRowsAction { get; set; }
//        /// <summary>
//        /// 
//        /// </summary>
//        public bool DisplayFooter { get; set; }
//        /// <summary>
//        /// 
//        /// </summary>
//        public string InitialSortColumn { get; set; }
//        /// <summary>
//        /// To activate/deactivate the user option to specify rows.
//        /// </summary>
//        public bool DisplayPageOptions { get; set; }
//        /// <summary>
//        /// Set the Default page size for the grid.
//        /// </summary>
//        public int DefaultPageSize { get; set; }
//        /// <summary>
//        /// Tittle to be displayed in the PDF print.
//        /// </summary>
//        public string PDFPrintTitle { get; set; }
//        /// <summary>
//        /// Unique ID Name for the row
//        /// </summary>
//        public string DataKeyName { get; set; }
//    }
//    /// <summary>
//    /// This class is meant for Edit the row. Action Name and Controller Name has to be provided.
//    /// </summary>
//    public class ActionTarget
//    {
//        /// <summary>
//        /// Provide Action Name
//        /// </summary>
//        public string ActionName { get; set; }
//        /// <summary>
//        /// Provide Controller Name
//        /// </summary>
//        public string ControllerName { get; set; }
//        /// <summary>
//        /// 
//        /// </summary>
//        public string AttributeName { get; set; }
//    }
//}
