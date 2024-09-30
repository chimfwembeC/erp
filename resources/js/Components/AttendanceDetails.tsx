import { Clock, CheckCircle } from 'lucide-react'; // Import relevant icons
import moment from 'moment';

const AttendanceDetails = ({ record }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Attendance Details</h3>
            <div className="flex justify-between mb-2">
                <p className="flex items-center text-sm text-gray-600">
                    <Clock className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="font-medium text-blue-600">Check-in:</span>
                    <span className="ml-2">{moment(record.check_in).format('MMMM Do YYYY, h:mm:ss a')}</span>
                </p>
                {record.check_out && (
                    <p className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        <span className="font-medium text-green-600">Check-out:</span>
                        <span className="ml-2">{moment(record.check_out).format('MMMM Do YYYY, h:mm:ss a')}</span>
                    </p>
                )}
                {!record.check_out && (
                    <p className="flex items-center text-sm text-gray-600">
                        <Clock className="h-5 w-5 text-yellow-600 mr-2" />
                        <span className="font-medium text-yellow-600">Check-out:</span>
                        <span className="ml-2">Not checked out yet</span>
                    </p>
                )}
            </div>
        </div>
    );
};

export default AttendanceDetails;
