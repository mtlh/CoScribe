export default function Login() {
    return (
        <main class="min-h-screen bg-no-repeat bg-center m-auto max-w-7xl" style={{ "background-image": "url(https://www.washingtonpost.com/creativegroup/uploads/2022/01/17214556/image-assets_hero_desk-1.jpg)" }}>
          <div class="flex min-h-[100dvh] items-center justify-center">
              <div class="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-950">
                  <div class="space-y-4">
                      <div class="text-center">
                          <h1 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">Login</h1>
                          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">Log in to your account to get started.</p>
                      </div>
                      <form class="space-y-4">
                          <div>
                              <label
                                  class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                  for="name"
                              >
                                  Name
                              </label>
                              <input
                                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                  id="name"
                                  placeholder="John Doe"
                                  required
                              />
                          </div>
                          <div>
                              <label
                                  class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                  for="email"
                              >
                                  Email
                              </label>
                              <input
                                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                  id="email"
                                  placeholder="example@email.com"
                                  required
                                  type="email"
                              />
                          </div>
                          <div>
                              <label
                                  class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                  for="password"
                              >
                                  Password
                              </label>
                              <input
                                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                  id="password"
                                  required
                                  type="password"
                              />
                          </div>
                          <button
                              class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 w-full bg-[#0077b6] text-white hover:bg-[#005a8d] focus:ring-[#0077b6]"
                              type="submit"
                              >
                              Login
                          </button>
                          <p class="hover:underline text-sm"><a href="/signup">Dont have an account? Sign Up</a></p>
                      </form>
                  </div>
              </div>
          </div>
        </main>
    );
  }