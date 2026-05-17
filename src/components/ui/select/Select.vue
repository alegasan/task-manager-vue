<template>
    <div class="relative">
        <button
            @click="isOpen = !isOpen"
            type="button"
            class="w-full px-4 py-2.5 bg-dark-surface border border-dark-border rounded-lg text-dark-text text-left flex items-center justify-between hover:border-dark-border hover:bg-dark-surface/95 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors">
            <span>{{ selectedLabel }}</span>
            <svg
                :class="['w-5 h-5 text-dark-textSecondary transition-transform', { 'rotate-180': isOpen }]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
        </button>

        <!-- Dropdown Menu -->
        <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95">
            <div
                v-show="isOpen"
                class="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-dark-border rounded-lg shadow-xl z-50 overflow-hidden">
                <div
                    v-for="option in options"
                    :key="option.value"
                    @click.stop="selectOption(option)"
                    class="px-4 py-3 cursor-pointer transition-colors"
                    :class="{
                        'bg-blue-500 text-white font-medium': modelValue === option.value,
                        'bg-slate-900 text-dark-text hover:bg-slate-800': modelValue !== option.value,
                    }">
                    {{ option.label }}
                </div>            </div>
        </transition>
    </div>

   
    <div
        v-if="isOpen"
        @click="isOpen = false"
        class="fixed inset-0 z-0" />
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
    options: {
        type: Array,
        required: true,
    },
})

const emit = defineEmits(['update:modelValue', 'change'])

const isOpen = ref(false)

const selectedLabel = computed(() => {
    const selected = props.options.find(opt => opt.value === props.modelValue)
    return selected ? selected.label : 'Select option'
})

const selectOption = (option) => {
    emit('update:modelValue', option.value)
    emit('change', option.value)
    isOpen.value = false
}
</script>
