
<script setup>
import { ref, watch, useTemplateRef } from 'vue';
import { usePdfViewer } from '../..//hooks/usePdfViewer';

const escalafonForm = ref({
    rfc: '',
    documentType: '',
    files: [],
});

const formErrors = ref({
    rfc: false,
    documentType: false,
    files: false,
});

const documentTypes = ref([
    { value: 'acta_nacimiento', text: 'Acta de nacimiento' },
    { value: 'constancia', text: 'Constancia' },
    { value: 'curp', text: 'CURP' },
]);

const filesInput = useTemplateRef('filesInput');
const viewerContainer = useTemplateRef('viewerContainer');

const { generatePdfThumbnail } = usePdfViewer();

const handleOnClickUploadFiles = () => filesInput.value.click();

const handleOnSubmit = (e) => {
    console.log('e', e);
};

const validar = () => {
    if (
        escalafonForm.value.rfc === '' &&
        escalafonForm.value.documentType === ''
    ) {
        formErrors.value.rfc = true;
        formErrors.value.documentType = true;
        return false;
    }

    if (escalafonForm.value.rfc === '') {
        formErrors.value.rfc = true;
        return false;
    }
    if (escalafonForm.value.documentType === '') {
        return false;
    }

    return true;
};

const handleFiles = (event) => {
    const files = event.target.files;

    if (!validar()) return;

    Array.from(files).forEach(async (file) => {
        const pdfUrl = await generatePdfThumbnail(file);
        if (pdfUrl)
            escalafonForm.value.files.push({
                file,
                pdfUrl,
            });
    });
};

const handleOnDeleteFile = (thumbnail) => {};

watch(escalafonForm, () => {
    console.log('escalafonForm', escalafonForm);
});
</script>
<template>
    <div class="custom-d-flex-column p-4">
        <div class="card">
            <div class="card-content p-4">
                <div class="custom-d-flex-row">
                    <form
                        class="custom-d-flex-column w-100"
                        @submit.prevent="handleOnSubmit"
                    >
                        <div class="form-group">
                            <label for="employee_id" class="form-label">
                                RFC:
                            </label>
                            <input
                                name="employee_id"
                                id="employee_id"
                                type="text"
                                placeholder="Ingrese su RFC"
                                v-model="escalafonForm.rfc"
                                class="form-control"
                                :class="{ 'is-invalid': formErrors.rfc }"
                            />
                            <div v-if="formErrors.rfc" class="invalid-feedback">
                                RFC es requerido
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="document_type" class="form-label">
                                Tipo de documento:
                            </label>
                            <select
                                name="document_type"
                                id="document_type"
                                class="form-select"
                                v-model="escalafonForm.documentType"
                                :class="{
                                    'is-invalid': formErrors.documentType,
                                }"
                            >
                                <option value="" disabled>
                                    Seleccione una opción...
                                </option>
                                <option
                                    v-for="doc in documentTypes"
                                    :key="doc.value"
                                    :value="doc.value"
                                >
                                    {{ doc.text }}
                                </option>
                            </select>
                            <div
                                v-if="formErrors.documentType"
                                class="invalid-feedback"
                            >
                                Tipo de documento es requerido
                            </div>
                        </div>

                        <div class="custom-d-flex-row">
                            <button
                                type="button"
                                class="btn btn-outline-primary btn-lg w-100"
                            >
                                <i class="bi bi-file-text"></i> Escanear
                                Documento
                            </button>
                            <button
                                type="button"
                                class="btn btn-outline-primary btn-lg w-100"
                                @click="handleOnClickUploadFiles"
                            >
                                <i class="bi bi-files"></i> Añadir archivos
                            </button>
                        </div>

                        <div class="w-100">
                            <button
                                type="submit"
                                class="btn btn-primary btn-lg w-100"
                            >
                                <i class="bi bi-floppy"></i> Guardar
                            </button>
                        </div>

                        <input
                            type="file"
                            ref="filesInput"
                            name="files"
                            id="files"
                            accept=".pdf"
                            @change="handleFiles"
                        />
                    </form>
                    <div class="w-100">
                        <div
                            v-if="escalafonForm.files.length"
                            class="thumbnails-list"
                        >
                            <div
                                v-for="(
                                    thumbnail, index
                                ) in escalafonForm.files"
                                :key="index"
                                class="thumbnail"
                                ref="viewerContainer"
                            >
                                <img
                                    :src="thumbnail.pdfUrl"
                                    alt="File preview"
                                />
                                <button class="btn btn-danger">
                                    <i class="bi bi-trash3"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="css" scoped>
.custom-d-flex-column {
    display: flex;
    flex-direction: column;
    gap: 1em;
}

.custom-d-flex-row {
    display: flex;
    flex-direction: row;
    flex-wrap: inherit;
    gap: 1em;
}

#files {
    visibility: hidden;
    height: 0;
}

.thumbnails-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.thumbnail {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: #eeeeee;
    border-radius: 1em;
}

.thumbnail img {
    width: 100%;
    height: 10em;
    border-radius: 4px;
    padding: 1em;
}
</style>