import { mealService } from "@/services/meal.service";
import { orderService } from "@/services/order.service";
import { userService } from "@/services/user.service";

const ProviderDashboardHome = async () => {
  // Logged-in provider
  const response = await userService.getSession();
  const user = response.data?.user ?? null;

  // Provider-specific data
  const { data: myMenus } = await mealService.getMyMeals()
  const { data: myOrders } = await orderService.getProviderOrders()

  const pendingOrders =
    myOrders?.filter((order:any) => order.status === "pending") || [];

  return (
    <div className="min-h-screen bg-background p-6 space-y-8">

      {/* PROVIDER HEADER */}
      <div className="bg-card rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-card-foreground">
          Welcome, {user?.name || "Provider"} 👋
        </h1>
        <p className="text-sm text-muted-foreground mt-1">{user?.email}</p>
        <span className="inline-block mt-3 px-4 py-1 text-sm rounded-full bg-accent/10 text-accent">
          Provider Account Active
        </span>
      </div>

      {/* BUSINESS SNAPSHOT */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

        <div className="bg-card rounded-xl shadow-sm p-6">
          <p className="text-sm text-muted-foreground">My Menus</p>
          <h2 className="text-3xl font-bold text-card-foreground mt-2">
            {myMenus?.length || 0}
          </h2>
        </div>

        <div className="bg-card rounded-xl shadow-sm p-6">
          <p className="text-sm text-muted-foreground">Orders Received</p>
          <h2 className="text-3xl font-bold text-card-foreground mt-2">
            {myOrders?.length || 0}
          </h2>
        </div>

        <div className="bg-card rounded-xl shadow-sm p-6">
          <p className="text-sm text-muted-foreground">Pending Orders</p>
          <h2 className="text-3xl font-bold text-primary mt-2">
            {pendingOrders.length}
          </h2>
        </div>

      </div>

      {/* RECENT ORDERS */}
      <div className="bg-card rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">
          Recent Orders on Your Menu
        </h3>

        {myOrders?.length ? (
          <ul className="space-y-3">
            {myOrders.slice(0, 5).map((order:any )=> (
              <li
                key={order.id}
                className="flex justify-between items-center text-sm border-b pb-2 last:border-b-0"
              >
                <div>
                  <p className="text-gray-700">
                    Order #{order.id.slice(0, 6)}
                  </p>
                  <p className="text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-semibold text-gray-700">
                    ৳{order.total}
                  </p>
                  <span
                    className={`inline-block mt-1 px-3 py-1 rounded-full text-xs ${
                      order.status === "pending"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">
            No orders yet. Orders will appear once customers purchase your menus.
          </p>
        )}
      </div>

      {/* EMPTY STATE HELP */}
      {!myMenus?.length && (
        <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-5 text-sm text-yellow-700">
          You haven’t added any menus yet. Add your first menu to start receiving orders 🍽️
        </div>
      )}

    </div>
  );
};

export default ProviderDashboardHome;