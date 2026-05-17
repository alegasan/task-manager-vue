<template>
    <AlertDialog :open="isOpen" @update:open="(open) => { isOpen = open; if (!open) isLoading = false }">
        <AlertDialogContent class="bg-dark-surface border-dark-border">
            <AlertDialogHeader>
                <AlertDialogTitle class="text-dark-text">{{ title }}</AlertDialogTitle>
                <AlertDialogDescription class="text-dark-textSecondary">
                    {{ description }}
                </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter class="gap-3">
                <AlertDialogCancel 
                    :disabled="isLoading"
                    class="bg-dark-border text-dark-text hover:bg-dark-border/80">
                    Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                    :class="[
                        'bg-red-600 text-white hover:bg-red-700',
                        isLoading && 'opacity-50 cursor-not-allowed',
                    ]"
                    :disabled="isLoading"
                    @click="handleConfirm">
                    {{ isLoading ? 'Deleting...' : 'Delete' }}
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
</template>

<script setup>
import { ref } from 'vue'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'

const props = defineProps({
    title: {
        type: String,
        default: 'Confirm Action',
    },
    description: {
        type: String,
        default: 'Are you sure?',
    },
})

const emit = defineEmits(['confirm'])

const isOpen = ref(false)
const isLoading = ref(false)

const openDialog = () => {
    isOpen.value = true
}

const closeDialog = () => {
    isOpen.value = false
    isLoading.value = false
}

const handleConfirm = async () => {
    isLoading.value = true
    emit('confirm')
}

defineExpose({
    openDialog,
    closeDialog,
})
</script>
