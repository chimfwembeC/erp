import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import Index from './Index'; // Your updated Jobs component
import Details from './Show';
import Create from './Create';
import Edit from './Edit';

function App({employees}) {  
  return (
    <Router>
      <Routes>
        <Route path="/hrm/employees" element={<Index employees={employees} />} />
        <Route path="/hrm/employees/create" element={<Create />} />
        <Route path="/hrm/employees/:id" element={<Details />} />
        <Route path="/hrm/employees/:id/edit" element={<Edit />} />
      </Routes>
    </Router>
  );
}

export default App;
