/**
 * @description Format date string to Taiwan(or other time zone) date format(yyyy-MM-dd)
 *
 * @param dateString
 * @param locale
 * @param timeZone
 * @returns string
 */

export function formatDate(dateString: string, locale = 'zh-TW', timeZone = 'Asia/Taipei') {
	const date = new Date(dateString);

	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		timeZone,
	};
	return date.toLocaleDateString(locale, options).replace(/\//g, '-');
}
