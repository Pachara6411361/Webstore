// ParentComponent.js
import React, { useState } from 'react';
import AddProductForm from './addproductform'; // Ensure the correct path to AddProductForm.js
 
const ParentComponent = () => {
    const [showForm, setShowForm] = useState(false);
  
    // Function to open the form
    const openForm = () => setShowForm(true);
  
    // Function to close the form
    const closeForm = () => setShowForm(false);
  
    return (
      <div>
        <button onClick={openForm}>Add New Product</button>
  
        {showForm && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeForm}>&times;</span> {/* Optional close button */}
              {/* Pass closeForm to AddProductForm as a prop */}
              <AddProductForm closeForm={closeForm} />
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default ParentComponent;