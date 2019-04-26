function hasPermission(user, permissionsNeeded) {
  const matchedPermissions = user.permissions.filter(permissionTheyHave =>
    permissionsNeeded.includes(permissionTheyHave)
  );
  if (!matchedPermissions.length) {
    throw new Error(`You do not have sufficient permissions
  
        : ${permissionsNeeded}
  
        You Have:
  
        ${user.permissions}
        `);
  }
}

function loggedIn(id) {
  if (!id) {
    throw new Error('You must be logged in to do that');
  }
}

exports.hasPermission = hasPermission;
exports.loggedIn = loggedIn;
