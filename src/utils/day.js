import dayjs from 'dayjs';

const formatDate = (date, format) => dayjs(date).format(format);

const isFuture = (dateFrom) => dateFrom && (dayjs().isSame(dateFrom, 'D') || dayjs().isBefore(dateFrom, 'D'));

const isDatesEqual = (dateA, dateB) => (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'day');

export { formatDate, isFuture, isDatesEqual };
