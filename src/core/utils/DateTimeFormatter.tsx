import moment from 'moment';
import React from 'react';

interface DateTimeFormatProps {
    timestamp: string | undefined;
}

const DateTimeFormat: React.FC<DateTimeFormatProps> = ({ timestamp }) => {

    const formatDateTime = () => {
        if (timestamp) {
          const date = new Date(timestamp);
          return moment.utc(date).local().format('DD/MM/YYYY HH:mm:ss');
        }
        return "";
      }

    return (
        <>
            {formatDateTime()}
        </>
    )
}

export type { DateTimeFormatProps }
export { DateTimeFormat }