// import { allUserService } from "@/services/allUser.service";
// import { categoryService } from "@/services/category.service";
// import { ideaService } from "@/services/idea.service"; // replace orderService
// import { userService } from "@/services/user.service";

const AdminDashboardHome = async () => {
  // const response = await userService.getSession();
  // const user = response.data?.user ?? null;

  // const { data: categories } = await categoryService.getAllCategories();
  // const { data: users } = await allUserService.getAllUsers();
  // const response = await userService.getSession();
  // const user = response.data?.user ?? null;

  // const { data: categories } = await categoryService.getAllCategories();
  // const { data: users } = await allUserService.getAllUsers();


  return (
    <div className="min-h-screen p-6 space-y-8">
      <div className="bg-card rounded-xl shadow-sm p-6 flex flex-col md:flex-row justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-card-foreground">
            {/* Welcome back, {user?.name || "Admin"} */}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Role: <span className="font-medium">Administrator</span>
          </p>
          <p className="text-sm text-muted-foreground">
            {/* Email: {user?.email || "N/A"} */}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Account Status</p>
          <span className="inline-block mt-2 px-4 py-1 rounded-full text-sm bg-green-100 text-green-700">
            Active
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card rounded-xl shadow-sm p-6">
          <p className="text-sm text-muted-foreground">Total Users</p>
          <h2 className="text-3xl font-bold text-card-foreground mt-2">
            {/* {/* {users?.length || 0} */}
            /</h2> 
        </div>
        <div className="bg-card rounded-xl shadow-sm p-6">
          <p className="text-sm text-muted-foreground">Categories</p>
          <h2 className="text-3xl font-bold text-card-foreground mt-2">
            {/* {/* {categories?.length || 0} */}
            </h2> 
        </div>
        <div className="bg-card rounded-xl shadow-sm p-6">
          <p className="text-sm text-muted-foreground">Total Ideas</p>
          <h2 className="text-3xl font-bold text-card-foreground mt-2">0</h2>
        </div>
        <div className="bg-card rounded-xl shadow-sm p-6">
          <p className="text-sm text-muted-foreground">Total Reviews</p>
          <h2 className="text-3xl font-bold text-card-foreground mt-2">0</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">Recently Registered Users</h3>
          <ul className="space-y-3">
            {/* {users?.slice(0, 5).map((u: any) => (
              <li key={u.id} className="flex justify-between text-sm border-b pb-2 last:border-b-0">
                <span className="text-card-foreground">{u.name}</span>
                <span className="text-muted-foreground">{u.email}</span>
              </li>
            ))} */}
          </ul>
        </div>
        <div className="bg-card rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">Recent Ideas</h3>
          <p className="text-sm text-muted-foreground">No recent ideas yet.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;