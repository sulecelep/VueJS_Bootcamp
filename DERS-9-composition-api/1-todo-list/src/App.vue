<template>
  <div class="w-screen h-screen bg-gray-400 pt-10">
    <div class="bg-gray-700 rounded-md shadow text-white w-1/3 mx-auto p-3">
      <h3 class="text-center text-2xl">Todo List</h3>
      <section class="mt-4">
        <input placeholder="Nedir?" type="text" class="w-full p-2 bg-gray-800 border-[1px] border-gray-400 rounded-md outline-none">
      </section>

      <section class="mt-4">
        <div class="flex justify-between items-center even:bg-gray-600 px-2 py-1">
          <label for="completed">
            <input type="checkbox" id="completed" class="me-2"/>
            <span class="text-lg">Todo 1</span> 
          </label>
          <button class="bg-indigo-500 px-2 py-1 rounded-md active:bg-indigo-800">Sil</button>
        </div>
        <div>
          <small class="text-green-300">Tamamlanmışlar</small>
        
        </div>
        <div>
          <small class="text-red-400">Tamamlanmamışlar</small>
        </div>
        

      </section>
    </div>
  </div>
</template>
