import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import JobIndex from './Index'; // Your updated Jobs component
import JobDetails from './Show';
import JobCreate from './Create';
import JobEdit from './Edit';

function App({jobs}) {  
  return (
    <Router>
      <Routes>
        <Route path="/hrm/jobs" element={<JobIndex jobs={jobs} />} />
        <Route path="/hrm/jobs/create" element={<JobCreate />} />
        <Route path="/hrm/jobs/:id" element={<JobDetails />} />
        <Route path="/hrm/jobs/:id/edit" element={<JobEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
