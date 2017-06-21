using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using FunPOL.UnitOfWork.Interface;
using FunPOL.UnitOfWork.ViewModels;

namespace FunPol.Mvc.Area.User.Controllers
{
    /// <summary>
    /// Class UserController.
    /// </summary>
    /// <seealso cref="Microsoft.AspNetCore.Mvc.Controller" />
    [Area("User")]
    public class UserController : Controller
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="UserController"/> class.
        /// </summary>
        /// <param name="unitOfWork">The user of work.</param>
        public UserController(IUnitOfWork unitOfWork)
        {
            this.UnitOfWork = unitOfWork;
        }

        #region PrivateProperties
        /// <summary>
        /// The unit of work
        /// </summary>
        private readonly IUnitOfWork UnitOfWork;
        #endregion

        #region PublicMethods
        /// <summary>
        /// Users the details.
        /// </summary>
        /// <returns></returns>
        public async Task<IActionResult> UserDetails()
        {
            //UserViewModel[] userViewModel = await this.UnitOfWork.GetUserDetails();
            return View(new UserViewModel[0]);
        }

        /// <summary>
        /// Errors this instance.
        /// </summary>
        /// <returns></returns>
        public IActionResult Error()
        {
            return View();
        }
        #endregion

        public ActionResult ExportGrid(string to)
        {
            //UserViewModel[] userViewModel = await this.UnitOfWork.GetUserDetails();
            if (to == "pdf")
            {
                //Export To PDF Code goes here
            }
            else
            {
                //Export to CSV goes here
            }
            //Utils.GridPDFPrint.ToPdf();
            return View();
        }

        //public void ExportToPdf(DataTable dt)
        //{

        //    Document document = new Document();
        //    PdfWriter writer = PdfWriter.GetInstance(document, new FileStream("c://Grid.pdf", FileMode.Create));
        //    document.Open();
        //    iTextSharp.text.Font font5 = iTextSharp.text.FontFactory.GetFont(FontFactory.HELVETICA, 5);

        //    PdfPTable table = new PdfPTable(dt.Columns.Count);
        //    PdfPRow row = null;
        //    float[] widths = new float[] { 4f, 4f, 4f, 4f };

        //    table.SetWidths(widths);

        //    table.WidthPercentage = 100;
        //    int iCol = 0;
        //    string colname = "";
        //    PdfPCell cell = new PdfPCell(new Phrase("Grid"));

        //    cell.Colspan = dt.Columns.Count;

        //    foreach (DataColumn c in dt.Columns)
        //    {

        //        table.AddCell(new Phrase(c.ColumnName, font5));
        //    }

        //    foreach (DataRow r in dt.Rows)
        //    {
        //        if (dt.Rows.Count > 0)
        //        {
        //            table.AddCell(new Phrase(r[0].ToString(), font5));
        //            table.AddCell(new Phrase(r[1].ToString(), font5));
        //            table.AddCell(new Phrase(r[2].ToString(), font5));
        //            table.AddCell(new Phrase(r[3].ToString(), font5));
        //        }
        //    }
        //    document.Add(table);
        //    document.Close();
        //}
    }
}
