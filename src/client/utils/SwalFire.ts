import Swal from "sweetalert2";

export const SwalError = (message: string) => {
    return Swal.fire({
        title: "Error!",
        icon: "error",
        text: message,
        toast: true,
        timer: 5000,
        position: "top-right",
    });
};

export const SwalSuccess = (message: string) => {
    return Swal.fire({
        title: "Nice!",
        icon: "success",
        text: message,
        toast: true,
        timer: 5000,
        position: "top-right",
    });
};
