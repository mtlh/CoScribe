import { Title } from "@solidjs/meta";

export default function Home() {
  return (
    <>
      <div style={{ "background-image": "url(https://www.washingtonpost.com/creativegroup/uploads/2022/01/17214556/image-assets_hero_desk-1.jpg)" }} class="min-h-60"></div>
      <main class="max-w-7xl m-auto mt-10 min-h-screen">
        <Title>CoScribe - About</Title>
        <div class="flex flex-col min-h-[100dvh]">
          <div class="flex-1">
            <section class="w-full py-12 md:py-24 lg:py-32">
              <div class="container px-4 md:px-6">
                <div class="grid gap-6 lg:grid-cols-2 lg:gap-12">
                  <div class="space-y-4">
                    <div class="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">Mission</div>
                    <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                      Empowering teams to create together
                    </h2>
                    <p class="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                      Our collaborative editor platform is designed to bring teams together, streamlining the creative
                      process and unlocking new levels of productivity and innovation.
                    </p>
                  </div>
                  <div class="space-y-4">
                    <div class="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">Meet the Team</div>
                    <div class="grid gap-6">
                      <div class="flex items-start gap-4">
                        <span class="relative flex shrink-0 overflow-hidden rounded-full h-12 w-12">
                          <span class="flex h-full w-full items-center justify-center rounded-full bg-slate-200">MHA</span>
                        </span>
                        <div class="space-y-1">
                          <div class="font-medium">Matthew</div>
                          <div class="text-sm text-gray-500 dark:text-gray-400">Founder, CEO</div>
                          <p class="text-sm text-gray-500 dark:text-gray-400">
                            Making useful things happen.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section class="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
              <div class="container px-4 md:px-6">
                <div class="flex flex-col items-center justify-center space-y-4 text-center">
                  <div class="space-y-2">
                    <div class="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">Trusted By</div>
                    <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Trusted by the best teams</h2>
                    <p class="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                      Our collaborative editor platform is trusted by leading companies and individuals across various industries.
                    </p>
                  </div>
                  <div class="grid w-full max-w-5xl grid-cols-2 items-center justify-center gap-8 lg:grid-cols-5 [&amp;>img]:mx-auto">
                    <svg width="200" height="100" class="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill="#040404"> <path d="M38.553 117.545c.428-.154.938.244.861.701-.017.546-.791.824-1.145.404-.356-.327-.19-.995.284-1.105zM86.98 117.93c.624-.482 1.47-.438 2.208-.326-.048.285-.103.568-.156.854-.468-.084-1.011-.19-1.423.113-.428.355-.41.962-.425 1.465.502.011 1.005.005 1.507.008l-.001.861c-.498.003-.996.002-1.494.002-.002 1.843 0 3.684-.001 5.526-.309-.002-.615 0-.923 0-.003-1.84-.006-3.68.001-5.52-.449-.01-.898-.007-1.348-.008a62.209 62.209 0 0 1 0-.864c.448 0 .896.002 1.346-.006-.043-.748.085-1.607.709-2.105zM104.725 117.534h.928c0 1.161-.006 2.321.006 3.481.503-.683 1.316-1.151 2.177-1.127.72-.013 1.513.217 1.938.836.498.7.443 1.604.447 2.418v3.291c-.312.004-.621-.005-.93-.005.001-1.174.005-2.35-.002-3.522-.023-.616-.055-1.313-.512-1.782-.645-.562-1.682-.494-2.328.033-.594.475-.788 1.269-.795 1.997-.008 1.092-.002 2.184-.002 3.274-.311-.003-.619.011-.928.003l.001-8.897zM112.885 117.58c.439-.24 1.035.174.951.672-.009.514-.693.781-1.072.461-.389-.279-.315-.936.121-1.133zM154.93 117.579c.446-.239 1.033.183.95.683-.032.543-.804.807-1.147.383-.331-.301-.215-.904.197-1.066zM151.248 117.632c.309-.001.617-.015.928-.008v8.81c-.308-.002-.615 0-.923.002-.008-2.935.003-5.872-.005-8.804zM41.965 120.484c.674-.598 1.647-.684 2.5-.531.624.113 1.15.527 1.455 1.076-.273.197-.554.384-.837.565-.41-.895-1.672-1.145-2.414-.522-.39.336-.338 1.043.127 1.283.855.468 1.956.332 2.725.98.892.704.751 2.277-.232 2.835-.64.446-1.448.367-2.186.354-.803-.017-1.512-.534-1.95-1.18.264-.189.535-.369.809-.546.529.892 1.76 1.23 2.659.703.491-.248.681-.995.24-1.379-.498-.413-1.178-.44-1.775-.611-.648-.146-1.342-.479-1.595-1.14-.199-.644-.063-1.433.474-1.887zM48.412 120.949c1.231-1.428 3.75-1.432 4.94.054-.251.197-.512.38-.766.576-.713-1.08-2.398-1.106-3.263-.205-1.005 1.056-.943 3.002.216 3.923.907.713 2.387.594 3.06-.388.254.192.51.383.759.584-.508.53-1.165 1.005-1.925 1.028-.762.035-1.582.071-2.253-.357-1.789-1.004-2.057-3.711-.768-5.215zM78.873 120.111c.53-.271 1.148-.244 1.722-.17-.05.309-.114.611-.172.918-.404-.047-.826-.08-1.214.068-.759.274-1.258 1.069-1.269 1.862-.009 1.216.011 2.433-.009 3.647-.307-.004-.613-.008-.919-.008-.013-2.129.043-4.261-.065-6.389.31-.002.62 0 .931 0 .001.363 0 .727-.006 1.092.245-.413.549-.817 1.001-1.02zM98.648 120.538c.67-.644 1.683-.744 2.56-.583a2.128 2.128 0 0 1 1.45 1.074c-.271.197-.553.384-.836.565-.41-.891-1.66-1.142-2.405-.532-.399.332-.352 1.047.117 1.293.898.492 2.093.322 2.851 1.097.491.471.567 1.233.359 1.854-.285.793-1.16 1.23-1.967 1.228-.597 0-1.232.062-1.783-.218-.453-.209-.819-.563-1.104-.969.264-.191.536-.371.81-.548.538.917 1.832 1.243 2.726.661.446-.273.59-.979.17-1.339-.498-.412-1.18-.438-1.778-.61-.646-.146-1.339-.48-1.589-1.14-.188-.622-.075-1.375.419-1.833zM125.447 121.016c.457-.578 1.107-1.029 1.855-1.107.748-.071 1.596.064 2.129.639.461.51.578 1.219.588 1.885.004 1.332-.006 2.666.004 4-.312-.008-.623.014-.932.004-.004-1.218.006-2.434-.004-3.648-.027-.598-.092-1.276-.561-1.706-.725-.563-1.846-.409-2.461.246-.485.519-.604 1.26-.617 1.944-.006 1.055.005 2.109-.004 3.164l-.922-.002c-.035-2.13.074-4.266-.065-6.39.321 0 .646-.002.972.001.02.32.022.645.018.97zM144.166 121.025c.459-.601 1.135-1.053 1.898-1.123.74-.062 1.582.08 2.104.658.48.539.566 1.291.575 1.983-.003 1.298.003 2.594-.005 3.89-.309 0-.613-.002-.922 0-.002-1.178.004-2.355-.002-3.531-.029-.629-.06-1.35-.549-1.812-.756-.61-1.975-.407-2.562.341-.42.51-.52 1.192-.529 1.834-.004 1.055.002 2.109-.001 3.168-.31-.002-.616 0-.923 0-.038-2.13.068-4.265-.066-6.392h.967c.023.328.023.656.015.984zM159.077 121.03c.509-.72 1.372-1.188 2.262-1.14.681.002 1.421.229 1.834.806.423.564.46 1.298.472 1.976v3.76c-.311 0-.617.002-.924.004-.017-1.211.02-2.425-.018-3.636-.021-.612-.08-1.319-.582-1.743-.777-.574-1.98-.354-2.551.411-.371.478-.481 1.097-.494 1.688-.004 1.092-.002 2.185-.002 3.276-.311.006-.62-.004-.93 0-.023-2.131.067-4.263-.061-6.389.32 0 .645-.002.967.004.022.327.027.655.027.983zM38.281 120.044c.31-.008.62.001.931.005-.014 2.129.001 4.258-.008 6.387-.308-.002-.615-.002-.922-.002-.002-2.13-.001-4.26-.001-6.39zM61.832 120.043c.362.005.724-.011 1.086.007.103.112.131.271.195.408a525.281 525.281 0 0 0 1.868 4.935c.663-1.785 1.349-3.563 2.017-5.349.354-.003.709-.001 1.065-.001-.868 2.128-1.736 4.257-2.593 6.391h-1.044c-.857-2.134-1.725-4.263-2.594-6.391zM112.699 120.043c.309 0 .617-.002.929.004-.011 2.13.002 4.258-.007 6.389-.309-.002-.614-.004-.922-.002-.002-2.13 0-4.261 0-6.391zM154.746 120.043c.309 0 .617-.002.93.004-.011 2.13.002 4.258-.008 6.389-.309-.002-.615-.004-.922-.002v-6.391zM35.682 117.534c-.31-.002-.619 0-.928.001.001 1.174.004 2.348-.003 3.521-1.154-1.473-3.56-1.547-4.882-.269-1.392 1.306-1.331 3.821.151 5.036.633.562 1.487.771 2.319.706.936.087 1.835-.4 2.411-1.115.005.339.006.679.006 1.019.307-.002.614 0 .921.004.011-2.967.001-5.935.005-8.903zm-1.601 7.476c-.83.867-2.327 1.004-3.281.266-.922-.704-1.13-2.061-.722-3.101a2.24 2.24 0 0 1 1.486-1.35c.967-.276 2.094.06 2.708.866.753.955.675 2.461-.191 3.319zM59.99 120.564c-.868-.664-2.048-.815-3.093-.562a3.13 3.13 0 0 0-1.781 1.188c-.737.996-.841 2.394-.345 3.521a3.16 3.16 0 0 0 2.181 1.779c.59.061 1.19.067 1.78.008 1.047-.222 1.957-1.01 2.307-2.021.493-1.35.127-3.032-1.049-3.913zm-.373 4.433c-.793.903-2.297 1.004-3.235.271-.887-.705-1.112-2.018-.722-3.049a2.257 2.257 0 0 1 1.466-1.386c.851-.253 1.854-.043 2.466.621.853.962.87 2.571.025 3.543zM74.981 123.507c.061-.996-.168-2.073-.91-2.789-.986-.979-2.649-1.081-3.819-.378-1.382.812-1.872 2.664-1.346 4.131a3.165 3.165 0 0 0 2.146 2.004c.462.092.938.053 1.408.053.933.005 1.744-.594 2.306-1.291-.235-.201-.48-.391-.719-.584-.568.837-1.661 1.312-2.65 1.015-.963-.259-1.619-1.19-1.72-2.158 1.768-.006 3.536-.003 5.304-.003zm-5.286-.78c.087-1.051 1.035-1.9 2.065-1.989.64-.046 1.339.15 1.755.665.324.363.424.854.473 1.324-1.43.007-2.862.003-4.293 0zM96.1 120.045c-.312-.002-.622-.002-.932-.002l.001.618c-1.354-1.09-3.54-1.052-4.763.223-1.405 1.448-1.147 4.175.622 5.216.753.518 1.697.453 2.565.416.587-.05 1.11-.358 1.577-.697-.002.203-.002.408-.001.613.306 0 .612.004.919.008.02-2.131-.003-4.263.012-6.395zm-1.704 5.196c-.858.698-2.22.683-3.06-.041-.815-.72-1.021-1.968-.649-2.963a2.285 2.285 0 0 1 1.438-1.395c.905-.284 2.001-.036 2.6.729.827 1.061.731 2.796-.329 3.67zM121.333 120.634c-.868-.713-2.088-.896-3.161-.631-.682.175-1.318.556-1.746 1.119-1.16 1.473-.857 3.937.771 4.946.781.549 1.773.488 2.679.44 1.065-.153 1.998-.938 2.39-1.935.513-1.332.214-3.021-.933-3.939zm-.749 4.636c-.829.644-2.098.647-2.93.006-.949-.743-1.155-2.176-.656-3.235a2.226 2.226 0 0 1 1.396-1.207c.853-.251 1.862-.039 2.467.636.937 1.055.852 2.91-.277 3.8zM140.215 120.626c-.871-.717-2.095-.886-3.17-.623-.766.19-1.457.67-1.882 1.338-1.005 1.511-.604 3.854 1.017 4.775.758.511 1.707.442 2.574.394 1.133-.162 2.123-1.033 2.467-2.122.435-1.301.091-2.892-1.006-3.762zm-.444 4.368c-.772.886-2.226 1.002-3.168.326-.967-.701-1.207-2.111-.762-3.178a2.239 2.239 0 0 1 1.426-1.307c.853-.258 1.86-.05 2.476.615.853.965.872 2.571.028 3.544zM171.76 123.507c.078-.851-.013-1.76-.556-2.455-1.042-1.446-3.368-1.538-4.622-.321-1.527 1.399-1.354 4.229.426 5.348.781.56 1.782.484 2.689.416.779-.13 1.404-.668 1.91-1.244a21.543 21.543 0 0 0-.715-.598c-.561.804-1.59 1.283-2.562 1.039-1.004-.228-1.708-1.185-1.812-2.181 1.748-.009 3.494-.003 5.242-.004zm-5.227-.778c.1-1.229 1.375-2.17 2.58-1.975.527.067 1.049.333 1.351.784.257.343.315.774.367 1.188-1.433.008-2.864.003-4.298.003zM168.66 95.175c-1.855-1.873-4.278-3.073-6.752-3.908-3.334-1.159-6.904-1.425-10.213-2.659-1.084-.411-2.162-.951-2.949-1.821-1.049-1.158-1.275-2.942-.645-4.355.403-.903 1.188-1.592 2.072-2.01 1.465-.686 3.129-.788 4.721-.665 1.621.12 3.267.651 4.477 1.769 1.049.948 1.708 2.269 1.975 3.646.041.358.297.74.7.705 2.595.026 5.188.066 7.784.061.369.048.723-.267.617-.651-.297-2.069-1.02-4.096-2.203-5.828-1.428-2.111-3.568-3.679-5.926-4.613-2.178-.881-4.524-1.257-6.86-1.388h-2.685c-2.871.152-5.785.569-8.424 1.768-1.926.864-3.681 2.212-4.783 4.033-1.084 1.737-1.506 3.806-1.529 5.833-1.396-2.854-3.491-5.348-5.993-7.298-3.329-2.62-7.487-4.109-11.71-4.336h-2.195a20.3 20.3 0 0 0-8.332 2.335 21.705 21.705 0 0 0-8.906 8.933c-.33-1.596-.846-3.17-1.689-4.574-1.114-1.918-2.792-3.485-4.739-4.539-2.571-1.415-5.514-1.984-8.418-2.155h-2.796c-2.107.124-4.22.369-6.247.979-2.351.696-4.633 1.899-6.198 3.828-.895 1.074-1.479 2.367-1.863 3.702.001-2.198-.002-4.397.003-6.596-.004-.242-.005-.524-.215-.688-.174-.195-.451-.179-.689-.184-2.347.011-4.695-.006-7.042.008-.352-.021-.635.302-.646.638-.037.632.013 1.266-.014 1.899a.37.37 0 0 1-.184.373c-.24-.102-.449-.261-.662-.409-2.832-1.99-6.167-3.34-9.641-3.552h-1.855c-1.885.106-3.763.429-5.549 1.047-3.107 1.07-5.905 2.952-8.184 5.307-2.68 2.692-4.584 6.165-5.323 9.897-.235 1.114-.35 2.246-.431 3.379v2.31c.14 2.551.671 5.095 1.724 7.431 1.667 3.698 4.476 6.844 7.856 9.063 3.231 2.12 7.117 3.15 10.968 3.106 3.851.035 7.624-1.421 10.638-3.779.167-.112.472-.428.622-.128.075.736-.013 1.479.036 2.219.011.328.291.65.634.637 2.438.007 4.876.008 7.313 0 .374.012.671-.355.64-.717.012-2.164-.005-4.328.007-6.492.72 1.529 1.65 2.978 2.896 4.134 2.087 1.996 4.853 3.136 7.66 3.667 2.34.46 4.736.504 7.112.443 2.512-.114 5.027-.493 7.411-1.312 1.895-.648 3.714-1.602 5.191-2.967a9.862 9.862 0 0 0 2.887-4.918 22.98 22.98 0 0 0 2.08 2.604c2.756 3.016 6.438 5.165 10.425 6.055 4.524 1.035 9.415.662 13.622-1.354 3.939-1.869 7.23-5.028 9.357-8.827.584 2.271 1.629 4.463 3.268 6.159 1.392 1.478 3.158 2.569 5.056 3.271 3.281 1.231 6.843 1.4 10.312 1.285 2.854-.144 5.724-.625 8.375-1.721 2.045-.847 3.972-2.113 5.312-3.9 1.168-1.541 1.793-3.438 1.942-5.354v-1.826c-.217-2.611-1.31-5.167-3.203-7zm-110.205 6.896a9.927 9.927 0 0 1-4.969 4.387c-2.681 1.083-5.779 1.233-8.497.194-2.376-.883-4.39-2.646-5.65-4.838-1.554-2.665-2.049-5.84-1.82-8.888.26-3.084 1.436-6.156 3.601-8.41a10.454 10.454 0 0 1 5.871-3.086c2.482-.38 5.102-.062 7.37 1.037 1.973.962 3.555 2.645 4.47 4.63.985 2.114 1.331 4.466 1.368 6.78.037 2.807-.356 5.713-1.744 8.194zm33.679 3.388c-.581 1.028-1.553 1.796-2.64 2.234-1.337.561-2.809.662-4.241.615-2.136-.062-4.38-.612-5.988-2.095-1.242-1.114-1.96-2.708-2.247-4.332-.033-.313-.246-.667-.604-.647-2.487-.08-4.976-.049-7.463-.125-.012-4.283.013-8.567-.012-12.851.283.841.609 1.677 1.112 2.414.944 1.439 2.347 2.516 3.851 3.316 2.817 1.492 5.973 2.133 9.071 2.75 2.352.493 4.752.956 6.92 2.032 1.253.632 2.476 1.62 2.819 3.045a5.351 5.351 0 0 1-.578 3.644zm6.599-10.724c-1.867-1.68-4.179-2.779-6.548-3.555-2.515-.844-5.152-1.195-7.708-1.873-1.354-.362-2.714-.774-3.925-1.493-.9-.538-1.709-1.327-2.041-2.345-.39-1.182-.279-2.564.444-3.599.618-.915 1.628-1.487 2.667-1.8 1.413-.408 2.912-.433 4.366-.255 1.498.192 2.988.778 4.068 1.859.966.926 1.564 2.186 1.818 3.49.045.342.263.719.65.711 2.605.029 5.211.062 7.816.067-1.167 2.768-1.676 5.794-1.607 8.793zm30.343 7.033c-1.006 1.899-2.633 3.446-4.542 4.426-2.194 1.107-4.751 1.381-7.164 1.005a10.528 10.528 0 0 1-5.44-2.599c-1.539-1.341-2.576-3.178-3.189-5.105-.75-2.386-.928-4.934-.641-7.414.348-2.712 1.324-5.452 3.26-7.445a10.733 10.733 0 0 1 6.631-3.283c2.123-.232 4.326.052 6.264.979 2.064.998 3.818 2.653 4.885 4.69 1.09 2.068 1.604 4.413 1.656 6.741.074 2.748-.411 5.563-1.72 8.005zm31.488 4.952c-1.168 1.009-2.715 1.454-4.229 1.566-2.07.114-4.234-.06-6.105-1.027-1.545-.778-2.746-2.18-3.32-3.809-.26-.609-.32-1.276-.525-1.899-.214-.443-.773-.293-1.168-.346-2.082-.006-4.164-.067-6.244-.062 1.066-3.212 1.307-6.664.881-10.012 1.428 1.873 3.568 3.031 5.734 3.846 3.6 1.368 7.477 1.694 11.152 2.78 1.404.432 2.816.958 3.975 1.884.771.611 1.377 1.481 1.523 2.468.223 1.681-.366 3.496-1.674 4.611z"></path> </g> </g></svg>
                    <svg width="200" height="100" class="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center" viewBox="0 0 192.756 192.756" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill-rule="evenodd" clip-rule="evenodd"><path d="M131.463 85.484h3.611v18.5h15.655l-2.299 3.614h-16.967V85.484zM103.109 107.598L89.753 86.524c-.821-1.368-3.01-1.368-3.941.055l-13.246 21.019h4.379l3.996-6.35h8.539l2.245-3.613h-8.539l4.653-7.279 10.893 17.242h4.377zM111.236 85.491c-6.102 0-10.119 4.947-10.119 11.05 0 6.102 4.018 11.051 10.119 11.051l14.838-.018 2.322-3.582h-17.051c-4.113 0-6.52-3.336-6.52-7.451s2.406-7.451 6.52-7.451h15.189l2.242-3.61-17.54.011zM18.624 89.09h15.654c4.115 0 6.521 3.336 6.521 7.451s-2.405 7.451-6.521 7.451H18.624c-4.115 0-6.52-3.336-6.52-7.451s2.405-7.451 6.52-7.451zm0-3.599c-6.103 0-10.12 4.947-10.12 11.05 0 6.102 4.017 11.051 10.12 11.051h15.654c6.103 0 10.12-4.949 10.12-11.051 0-6.103-4.017-11.05-10.12-11.05H18.624zM154.588 98.293c.588 3.27 2.838 5.699 6.35 5.699h17.051l-2.324 3.582-14.836.018c-6.104 0-10.119-4.949-10.119-11.051 0-6.103 4.016-11.05 10.119-11.05l17.539-.01-2.24 3.61h-15.189c-3.463 0-5.723 2.388-6.35 5.59h21.43l-2.299 3.613h-19.132v-.001zM64.821 98.613a6.562 6.562 0 0 0 0-13.122l-18.419-.008v22.114h4.051V89.091h14.368a2.961 2.961 0 0 1 0 5.922H53.299l12.998 12.559h5.229l-9.305-8.951 2.6-.008zM182.152 85.504c.939 0 1.682.742 1.682 1.726 0 1-.742 1.736-1.682 1.736-.951 0-1.691-.736-1.691-1.736 0-.984.74-1.726 1.691-1.726v-.346c-1.143 0-2.109.879-2.109 2.071 0 1.204.967 2.083 2.109 2.083 1.133 0 2.1-.879 2.1-2.083 0-1.192-.967-2.071-2.1-2.071v.346z"></path> <path d="M181.713 86.345h.496c.252 0 .521.055.521.352 0 .368-.275.391-.584.391h-.434v.308h.418l.633 1.039h.406l-.682-1.055c.352-.044.621-.23.621-.659 0-.473-.281-.682-.846-.682h-.914v2.396h.363v-2.09h.002z"></path> </g> </g></svg>
                    <svg width="200" height="100" class="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center" viewBox="0 -81 252 252" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M0 0h252v90H0z"></path><path fill="#FFF" d="M66.127 39.943c0 2.504-1.552 4.365-4.655 5.586-2.41.951-5.349 1.432-8.819 1.432H38.428c-3.73 0-6.862-.434-9.407-1.291-3.498-1.176-5.252-3.053-5.252-5.635v-13.81c0-2.481 1.783-4.313 5.359-5.502 2.823-.889 5.936-1.338 9.348-1.338h5.648c1.523 0 2.284.68 2.284 2.041 0 1.367-.761 2.055-2.284 2.055h-1.725c-.164 0-.26-.006-.28-.023-.433-.014-.819-.021-1.156-.029-.338-.008-.617-.016-.819-.016-6.737 0-10.111.934-10.111 2.803v13.797c0 1.871 2.824 2.807 8.472 2.807h14.158c1.349 0 2.795-.201 4.318-.611 1.918-.516 2.881-1.205 2.881-2.086v-2.934h-8.803c-1.161 0-2.112-.994-2.112-2.209 0-1.217.951-2.211 2.112-2.211h10.585c.535-.055 1.302-.049 2.286-.049 1.465 0 2.197.588 2.197 1.77v5.453M103.09 40.082v-8.357c0-1.717-2.429-2.6-7.344-2.6h-9.715c-1.793 0-3.412.186-4.858.557-2.024.559-3.007 1.348-3.007 2.414v7.986c0 1.021 1.041 1.811 3.065 2.275 1.388.324 3.007.465 4.858.465h9.657c1.561 0 3.064-.186 4.452-.512 1.909-.509 2.892-1.253 2.892-2.228m6.014 0c0 2.508-1.504 4.318-4.569 5.434-2.139.883-5.031 1.347-8.616 1.347h-9.888c-3.296 0-6.246-.464-8.906-1.347-3.296-1.162-4.915-2.973-4.915-5.434v-7.986c0-2.414 1.619-4.27 4.858-5.523 2.428-.977 5.377-1.439 8.905-1.439h9.946c8.79 0 13.185 2.275 13.185 6.918v8.03zM181.186 27.361c0 1.207-.926 1.811-2.66 1.811-.231 0-.578 0-1.041-.047h-1.1c-4.568 0-6.824.883-6.824 2.74v13.186c0 .883-.461 1.439-1.271 1.672-.349.094-1.215.14-2.603.14-1.389 0-2.082-.604-2.082-1.812V31.865c0-2.879 1.793-4.783 5.437-5.803 2.197-.652 5.493-.93 9.89-.93 1.504.001 2.254.743 2.254 2.229M216.182 40.082v-8.357c0-1.717-2.429-2.6-7.343-2.6h-9.715c-1.794 0-3.412.186-4.858.557-2.023.559-3.006 1.348-3.006 2.414v7.986c0 1.021 1.041 1.811 3.063 2.275 1.389.324 3.007.465 4.854.465h9.66c1.561 0 3.062-.186 4.451-.512 1.91-.509 2.894-1.253 2.894-2.228m6.013 0c0 2.508-1.504 4.318-4.567 5.434-2.14.883-5.032 1.347-8.616 1.347h-9.888c-3.298 0-6.246-.464-8.905-1.347-3.298-1.162-4.916-2.973-4.916-5.434v-7.986c0-2.414 1.618-4.27 4.856-5.523 2.43-.977 5.378-1.439 8.905-1.439h9.945c8.789 0 13.186 2.275 13.186 6.918v8.03zM151.957 29.387v-3.762c0-1.578-2.725-2.414-8.171-2.414h-22.195v9.566h22.195c5.446 0 8.171-1.162 8.171-3.39m6.259.185c0 2.74-1.737 4.736-5.157 5.992-2.666.881-5.854 1.299-9.619 1.299h-21.849v8.082c0 .881-.406 1.438-1.333 1.67-.232.094-1.159.141-2.724.141-1.449 0-2.202-.604-2.202-1.811V20.889c0-1.162.753-1.766 2.202-1.766h26.194c3.535 0 6.549.418 9.039 1.162 3.652 1.113 5.448 2.785 5.448 4.969v4.318h.001zM91.362 62.955c-.266 1.113-.06 2.418.202 2.904.262.483 1.118.916 1.768.916.667 0 1.617-.314 2.096-.789.481-.475 1.145-1.611 1.439-2.844.25-1.037.063-2.023-.204-2.504-.268-.478-1.066-1.117-1.724-1.117-.626 0-1.637.287-2.134.772-.494.486-1.173 1.541-1.443 2.662m-2.857.096c.432-1.799 1.527-3.287 2.682-4.287 1.157-1.002 2.64-1.203 4.273-1.203 1.675 0 2.901.687 3.572 1.672.671.982 1.039 2.326.613 4.099a8.778 8.778 0 0 1-1.426 3.133c-.593.824-1.408 1.343-2.266 1.802-.86.459-1.881.563-2.999.563-1.135 0-2.028-.197-2.678-.595-.648-.396-1.399-1.021-1.657-1.879-.256-.856-.423-2.016-.114-3.305M77.077 68.5l2.379-10.77 4.939.018c.106 0 3.638-.18 3.465 2.811-.124 2.176-1.08 2.42-2.998 3.431.965 1.604 1.298 2.469 2.574 4.512H84.22c-.357-1.021-1.89-3.905-1.898-3.905l-1.665-.019-.845 3.938-2.735-.016m4.115-5.865h1.894c1.757 0 2.593-2.756.768-2.785l-1.982-.037-.68 2.822zM70.132 57.766l7.754.035-.406 1.982-5.007.035-.454 1.911 4.664.017-.435 2.053h-4.77l-.556 2.732 4.947-.086-.299 2.088-7.853-.088zM58.504 57.73l2.828.018-.961 3.926 4.07.105.873-4.013 2.808.035L65.671 68.5l-2.789.016 1.069-4.702-4.07-.035-1.123 4.737-2.776-.016zM99.732 68.484h2.571l.709-2.802h-2.571z"></path><path fill="#00AEEF" d="M110.044 53.648h23.841v18.229h-23.841zM138.801 53.648h23.842v18.229h-23.842z"></path><path fill="#005DAC" d="M167.747 53.646h23.84v18.229h-23.84z"></path><path fill="#FFF" d="M197.303 53.648h23.842v18.229h-23.842zM46.063 63.604h1.846c-.02-.636.433-.957 1.345-.953.754.016 1.175.258 1.262.715 0 .588.012 1.141.024 1.691-.405-.474-1.159-.746-2.262-.822-1.745.164-2.587.969-2.523 2.42.063 1.268.968 1.941 2.713 2.014.917.041 1.615-.23 2.106-.846.013.268.013.508.013.75h1.701c.013-1.84.013-3.666.013-5.494-.428-.953-1.147-1.461-2.143-1.523-.877-.024-1.741-.024-2.606-.024-1.079.3-1.563.988-1.489 2.072M38.133 61.484h1.75c1.301 0 2.366 1.049 2.366 2.33v1.465h-4.733c-.199 1.441.172 2.141 1.091 2.1.336-.02.692-.02 1.05-.02.61.055.898-.275.885-1.072h1.708v.041c0 1.281-1.065 2.33-2.366 2.33h-1.75c-1.302 0-2.367-1.049-2.367-2.33v-2.514c-.001-1.281 1.064-2.33 2.366-2.33M27.266 58.559v9.935h5.763c1.563.104 2.358-.775 2.387-2.615.069-1.285-.46-2.125-1.605-2.496.899-.172 1.38-.928 1.421-2.286-.097-1.613-.988-2.468-2.676-2.576-1.785.004-3.568.01-5.29.038"></path><path d="M29.18 60.229v2.535c.994-.021 1.929-.021 2.861-.021.81.014 1.2-.393 1.193-1.193-.041-.729-.384-1.148-1.028-1.279a74.954 74.954 0 0 1-3.026-.042M29.18 64.186v2.76c1.064-.021 2.064-.021 3.063-.021.868.016 1.287-.426 1.279-1.301-.044-.793-.411-1.25-1.103-1.393a83.959 83.959 0 0 1-3.239-.045M40.541 64.309c.09-1.078-.384-1.594-1.44-1.563-1.174-.008-1.702.521-1.585 1.586a48.42 48.42 0 0 1 3.025-.023M50.54 66.141c-.343-.606-1.095-.811-2.259-.604-.645.281-.893.709-.742 1.289.168.73.949.941 2.358.6.511-.205.725-.629.643-1.285"></path><path fill="#FFF" d="M225.402 44.408a2.541 2.541 0 1 1 0 5.083 2.541 2.541 0 0 1 0-5.083"></path><path d="M225.402 44.783c1.193 0 2.166.971 2.166 2.166s-.973 2.164-2.166 2.164a2.165 2.165 0 0 1 0-4.33"></path><path fill="#FFF" d="M224.539 48.006v-2.402h1.07c.216 0 .379.02.488.063a.546.546 0 0 1 .271.229c.066.106.1.229.1.36a.61.61 0 0 1-.166.433c-.109.117-.283.188-.515.223.086.039.149.08.192.119.095.086.183.193.267.32l.42.653h-.401l-.318-.502a5.766 5.766 0 0 0-.23-.328.726.726 0 0 0-.164-.163.439.439 0 0 0-.145-.062 1.205 1.205 0 0 0-.18-.01h-.369v1.065l-.32.002z"></path><path d="M224.857 46.662h.688c.146 0 .259-.014.343-.045a.361.361 0 0 0 .188-.143.392.392 0 0 0 .062-.218.347.347 0 0 0-.123-.278c-.082-.074-.213-.111-.394-.111h-.765v.795"></path></g></svg>
                    <svg width="200" height="100" class="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center" viewBox="0 0 192.756 192.756" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill-rule="evenodd" clip-rule="evenodd"><path d="M2.834 105.467h20.235L33.66 87.368H13.505L2.834 105.467zM43.54 87.368h-8.22l-10.671 18.099h8.3L43.54 87.368zM34.925 105.467h5.533l10.591-18.099h-5.533l-10.591 18.099zM43.145 105.467h4.031l10.749-18.099h-4.189l-10.591 18.099zM64.407 87.368h-3.399l-10.591 18.099h3.398l10.592-18.099zM189.922 91.636v-4.347h-35.094v18.1h35.094V94.165h-20.945v4.347h15.175v2.371h-23.476v-9.247h29.246zM142.576 91.873v13.516h5.85v-18.1h-8.615l-11.856 8.141-12.252-8.141h-8.299v18.1h5.85V91.873l11.459 8.379h5.93l11.933-8.379zM103.215 105.389l-9.722-18.1H70.018l-10.67 18.1h6.639l2.292-3.873h26.478l2.055 3.873h6.403zm-13.2-13.753l2.451 5.216H70.651l2.845-5.216h16.519z"></path> </g> </g></svg>
                    <svg width="200" height="100" class="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center" viewBox="1.91 -84.333 192.757 192.757" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#231f20" d="M1.91-25.333h192.757v74.755H1.91z"></path><path d="M114.738 1.027c-2.424 0-4.328.52-6.233 1.558 0-5.541 0-10.562.174-12.293L97.076-7.631v1.039l1.212.173c1.557.346 2.079 1.211 2.422 3.29.349 4.156.174 26.321 0 29.958 3.117.693 6.408 1.213 9.699 1.213 9.178 0 14.719-5.715 14.719-14.72 0-7.099-4.502-12.295-10.39-12.295zm-3.983 25.109c-.693 0-1.56 0-2.078-.172-.174-2.424-.346-12.642-.174-21.646 1.039-.347 1.731-.52 2.598-.52 3.812 0 5.89 4.502 5.89 10.042-.001 6.929-2.599 12.296-6.236 12.296zM53.436-9.016H22.958v1.558l1.732.173c2.25.346 3.117 1.731 3.462 5.021.521 6.234.347 17.491 0 22.857-.346 3.291-1.211 4.85-3.462 5.021l-1.732.348v1.385h19.568v-1.385l-2.078-.348c-2.251-.172-3.117-1.73-3.463-5.021-.174-2.252-.347-5.889-.347-10.39l4.156.173c2.598 0 3.809 2.078 4.329 5.021h1.559V3.106h-1.559c-.521 2.944-1.731 5.021-4.329 5.021l-4.155.174c0-5.888.173-11.429.347-14.719h6.06c4.677 0 7.101 2.943 8.832 8.139l1.732-.52-.174-10.217z" fill="#ffffff"></path><path d="M63.307.681c8.659 0 12.988 5.888 12.988 13.68 0 7.446-4.849 13.682-13.508 13.682-8.658 0-12.987-5.889-12.987-13.682 0-7.446 4.848-13.68 13.507-13.68zm-.52 1.732c-3.81 0-4.849 5.195-4.849 11.948 0 6.58 1.732 11.948 5.196 11.948 3.98 0 5.021-5.195 5.021-11.948 0-6.58-1.73-11.948-5.368-11.948zM127.378 14.535c0-7.1 4.502-13.854 13.334-13.854 7.271 0 10.736 5.369 10.736 12.468h-16.105c-.174 6.407 2.943 11.083 9.178 11.083 2.771 0 4.156-.691 5.889-1.904l.691.865c-1.732 2.424-5.541 4.85-10.389 4.85-7.793-.001-13.334-5.542-13.334-13.508zm7.965-3.29l8.139-.174c0-3.463-.52-8.658-3.463-8.658s-4.504 4.848-4.676 8.832zM172.058 2.067C169.98 1.2 167.21.681 164.093.681c-6.406 0-10.391 3.809-10.391 8.312s2.941 6.407 7.102 7.793c4.328 1.557 5.541 2.77 5.541 4.848s-1.559 3.982-4.33 3.982c-3.289 0-5.715-1.904-7.619-7.1l-1.213.348.174 7.619c2.078.865 5.887 1.559 9.178 1.559 6.754 0 11.084-3.465 11.084-8.832 0-3.637-1.906-5.714-6.408-7.447-4.85-1.904-6.58-3.116-6.58-5.368 0-2.251 1.561-3.81 3.639-3.81 3.115 0 5.193 1.905 6.754 6.581l1.211-.346-.177-6.753zM98.806 1.374c-2.943-1.73-8.139-.866-10.909 5.369l.172-6.061-11.601 2.251v1.039l1.212.173c1.56.174 2.251 1.039 2.425 3.291.346 4.156.173 11.43 0 15.066-.174 2.076-.865 3.115-2.425 3.289l-1.212.174v1.385h16.104v-1.385l-2.078-.174c-1.731-.174-2.251-1.213-2.425-3.289-.346-3.291-.346-9.871-.172-14.027.865-1.213 4.675-2.251 8.138 0l2.771-7.101z" fill="#ffffff"></path></g></svg>
                  </div>
                </div>
              </div>
            </section>
            <section class="w-full py-12 md:py-24 lg:py-32">
              <div class="container px-4 md:px-6">
                <div class="grid gap-6 lg:grid-cols-2 lg:gap-12">
                  <div class="space-y-4">
                    <div class="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">Contact Us</div>
                    <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Get in touch</h2>
                    <p class="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                      Have a question or want to learn more about our collaborative editor platform? Fill out the form and
                      our team will be in touch.
                    </p>
                    <form class="space-y-4">
                      <div class="grid gap-4 sm:grid-cols-2">
                        <div class="space-y-2">
                          <label
                            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            for="name"
                          >
                            Name
                          </label>
                          <input
                            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            id="name"
                            required
                            type="text"
                          />
                        </div>
                        <div class="space-y-2">
                          <label
                            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            for="email"
                          >
                            Email
                          </label>
                          <input
                            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            id="email"
                            required
                            type="email"
                          />
                        </div>
                      </div>
                      <div class="space-y-2">
                        <label
                          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          for="message"
                        >
                          Message
                        </label>
                        <textarea
                          class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          id="message"
                          rows="4"
                          required
                        ></textarea>
                      </div>
                      <button
                        class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-400 text-primary-foreground hover:bg-blue/600 h-10 px-4 py-2 w-full"
                        type="submit"
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                  <div class="space-y-4">
                    <div class="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">Why Choose Us?</div>
                    <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                      Unlock your team's potential
                    </h2>
                    <p class="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                      Our collaborative editor platform is designed to streamline your team's workflow, improve
                      communication, and foster innovation. Experience the difference with our powerful tools and intuitive
                      interface.your team's workflow, improve communication, and foster innovation.
                    </p>
                    <div class="flex flex-col gap-2 min-[400px]:flex-row">
                      <a
                        href="#"
                        class="inline-flex h-10 items-center justify-center rounded-md bg-blue-700 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-blue-600/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                      >
                        Learn More
                      </a>
                      <a
                        href="#"
                        class="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                      >
                        Get Started
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
