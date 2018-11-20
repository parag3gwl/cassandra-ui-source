export function showNotification(isShown_, message_, nature_) {
    return {
        type: "SHOW_NOTIFICATION",
        isShown_: isShown_,
        message_: message_,
        nature_: nature_,
    }
}
