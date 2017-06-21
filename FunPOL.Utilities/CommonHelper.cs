using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Globalization;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace FunPOL.Utilities
{
    public class CommonHelper
    {

        #region Email Validation
        /// <summary>
        /// Ensures the subscriber email or throw.
        /// </summary>
        /// <param name="email">The email.</param>
        /// <returns></returns>
        public static string EnsureSubscriberEmailOrThrow(string email)
        {
            string output = EnsureNotNull(email);
            output = output.Trim();
            output = EnsureMaximumLength(output, 255);

            if (!IsValidEmail(output))
            {
                throw new COMException("Email is not valid.");
            }

            return output;
        }

        /// <summary>
        /// Verifies that a string is in valid e-mail format
        /// </summary>
        /// <param name="email">Email to verify</param>
        /// <returns>true if the string is a valid e-mail address and false if it's not</returns>
        public static bool IsValidEmail(string email)
        {
            if (String.IsNullOrEmpty(email))
                return false;

            email = email.Trim();
            var result = Regex.IsMatch(email, "^(?:[\\w\\!\\#\\$\\%\\&\\'\\*\\+\\-\\/\\=\\?\\^\\`\\{\\|\\}\\~]+\\.)*[\\w\\!\\#\\$\\%\\&\\'\\*\\+\\-\\/\\=\\?\\^\\`\\{\\|\\}\\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\\-](?!\\.)){0,61}[a-zA-Z0-9]?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\\[(?:(?:[01]?\\d{1,2}|2[0-4]\\d|25[0-5])\\.){3}(?:[01]?\\d{1,2}|2[0-4]\\d|25[0-5])\\]))$", RegexOptions.IgnoreCase);
            return result;
        }

        /// <summary>
        /// Ensure that a string is not null
        /// </summary>
        /// <param name="str">Input string</param>
        /// <returns>Result</returns>
        public static string EnsureNotNull(string str)
        {
            if (str == null)
                return string.Empty;

            return str;
        }

        /// <summary>
        /// Ensure that a string doesn't exceed maximum allowed length
        /// </summary>
        /// <param name="str">Input string</param>
        /// <param name="maxLength">Maximum length</param>
        /// <param name="postfix">A string to add to the end if the original string was shorten</param>
        /// <returns>Input string if its lengh is OK; otherwise, truncated input string</returns>
        public static string EnsureMaximumLength(string str, int maxLength, string postfix = null)
        {
            if (String.IsNullOrEmpty(str))
                return str;

            if (str.Length > maxLength)
            {
                var result = str.Substring(0, maxLength);
                if (!String.IsNullOrEmpty(postfix))
                {
                    result += postfix;
                }
                return result;
            }

            return str;
        }
        #endregion

        /// <summary>
        /// Generate random digit code
        /// </summary>
        /// <param name="length">Length</param>
        /// <returns>Result string</returns>
        public static string GenerateRandomDigitCode(int length)
        {
            var random = new Random();
            string str = string.Empty;
            for (int i = 0; i < length; i++)
                str = String.Concat(str, random.Next(10).ToString());
            return str;
        }

        /// <summary>
        /// Indicates whether the specified strings are null or empty strings
        /// </summary>
        /// <param name="stringsToValidate">Array of strings to validate</param>
        /// <returns>Boolean</returns>
        public static bool AreNullOrEmpty(params string[] stringsToValidate)
        {
            bool result = false;
            foreach (var str in stringsToValidate)
            {
                if (string.IsNullOrEmpty(str)) result = true;
            }
            return result;
        }

        /// <summary>
        /// Compare two arrasy
        /// </summary>
        /// <typeparam name="T">Type</typeparam>
        /// <param name="a1">Array 1</param>
        /// <param name="a2">Array 2</param>
        /// <returns>Result</returns>
        public static bool ArraysEqual<T>(T[] a1, T[] a2)
        {
            //also see Enumerable.SequenceEqual(a1, a2);
            if (ReferenceEquals(a1, a2))
                return true;

            if (a1 == null || a2 == null)
                return false;

            if (a1.Length != a2.Length)
                return false;

            var comparer = EqualityComparer<T>.Default;
            for (int i = 0; i < a1.Length; i++)
            {
                if (!comparer.Equals(a1[i], a2[i])) return false;
            }
            return true;
        }        

        /// <summary>
        /// Determines whether [is digits only] [the specified string].
        /// </summary>
        /// <param name="str">The string.</param>
        /// <returns></returns>
        public static bool IsDigitsOnly(string str)
        {
            int len = str.Length;
            for (int i = 0; i < len; i++)
            {
                char c = str[i];
                if (c < '0' || c > '9')
                    return false;
            }
            return true;
        }

        /// <summary>
        /// To get the weeknumber for the given date
        /// </summary>
        /// <param name="date"></param>
        /// <returns></returns>
        public static int GetWeekNumber(DateTime date)
        {
            CultureInfo ciCurr = CultureInfo.CurrentCulture;
            int weekNum = ciCurr.Calendar.GetWeekOfYear(date, CalendarWeekRule.FirstFourDayWeek, DayOfWeek.Sunday);
            return weekNum;
        }

        /// <summary>
        /// Get the year alone for the given date
        /// </summary>
        /// <param name="date"></param>
        /// <returns></returns>
        public static int GetYear(DateTime date)
        {            
            return date.Month == 1 && GetWeekNumber(date) > 51 ? date.Year - 1 : date.Year;
        }

        /// <summary>
        /// to get the trimmed and lowecase string for the given string
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>
        public static string TrimAndToLower(string str)
        {
            return String.IsNullOrWhiteSpace(str) ? string.Empty : str.Trim().ToLower();
        }

        #region Decimal rounding

        /// <summary>
        /// To increase the decimal value to the nearest next value
        /// </summary>
        /// <param name="number"></param>
        /// <param name="places"></param>
        /// <returns></returns>
        public static decimal RoundUp(decimal number, int places)
        {
            decimal factor = RoundFactor(places);
            number *= factor;
            number = Math.Ceiling(number);
            number /= factor;
            return number;
        }
        /// <summary>
        /// To increase the decimal value to the nearest previous value
        /// </summary>
        /// <param name="number"></param>
        /// <param name="places"></param>
        /// <returns></returns>
        public static decimal RoundDown(decimal number, int places)
        {
            decimal factor = RoundFactor(places);
            number *= factor;
            number = Math.Floor(number);
            number /= factor;
            return number;
        }
        /// <summary>
        /// to remove the places as per the input parameter 
        /// </summary>
        /// <param name="places"></param>
        /// <returns></returns>
        internal static decimal RoundFactor(int places)
        {
            decimal factor = 1;

            if (places < 0)
            {
                places = -places;
                for (int i = 0; i < places; i++)
                    factor /= 10;
            }
            else
            {
                for (int i = 0; i < places; i++)
                    factor *= 10;
            }

            return factor;
        }

        #endregion

    }
}
