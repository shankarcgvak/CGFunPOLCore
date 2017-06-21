using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FunPOL.Utilities
{
    public static class TimeSpanExtension
    {
        public static DateTime AsDateTime(this TimeSpan ts)
        {
            return DateTime.Today + ts;
        }

        public static string ToShortTimeString(this TimeSpan ts)
        {
            return (DateTime.Today + ts).ToString("d");
        }
    }
}
