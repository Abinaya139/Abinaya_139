// Function to handle the leave application form submission
document.getElementById('leave-form').addEventListener('submit', function(event) {
  event.preventDefault();  // Prevent form submission to server

  // Get the selected leave type and leave balance
  const leaveType = document.getElementById('leave-type').value;
  const startDate = new Date(document.getElementById('start-date').value);
  const endDate = new Date(document.getElementById('end-date').value);

  // Validate if start date is before end date
  if (startDate > endDate) {
    alert("Start date cannot be later than end date.");
    return;
  }

  // Calculate the number of leave days
  const leaveDays = calculateLeaveDays(startDate, endDate);

  // Fetch the current leave balance for the selected leave type
  const availableLeave = getAvailableLeave(leaveType);

  // Check if there are enough available days
  if (leaveDays <= availableLeave) {
    // Deduct the leave days from the balance (for demo purposes, no server interaction)
    updateLeaveBalance(leaveType, availableLeave - leaveDays);
    alert("Leave application submitted successfully.");
  } else {
    alert("Insufficient leave balance.");
  }
});

// Function to calculate the number of leave days
function calculateLeaveDays(startDate, endDate) {
  const timeDiff = endDate - startDate;
  const days = timeDiff / (1000 * 3600 * 24);
  return days + 1;  // Include both the start and end day
}

// Function to fetch the available leave balance for the selected leave type
function getAvailableLeave(leaveType) {
  let availableLeave = 0;

  switch (leaveType) {
    case 'casual_leave':
      availableLeave = parseInt(document.getElementById('casual-leave-balance').textContent);
      break;
    case 'medical_leave':
      availableLeave = parseInt(document.getElementById('medical-leave-balance').textContent);
      break;
    case 'earned_leave':
      availableLeave = parseInt(document.getElementById('earned-leave-balance').textContent);
      break;
  }

  return availableLeave;
}

// Function to update the available leave balance after the leave application is processed
function updateLeaveBalance(leaveType, newBalance) {
  switch (leaveType) {
    case 'casual_leave':
      document.getElementById('casual-leave-balance').textContent = newBalance + ' days';
      break;
    case 'medical_leave':
      document.getElementById('medical-leave-balance').textContent = newBalance + ' days';
      break;
    case 'earned_leave':
      document.getElementById('earned-leave-balance').textContent = newBalance + ' days';
      break;
  }
}
