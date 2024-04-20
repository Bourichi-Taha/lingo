import {  Create, TextInput, SimpleForm, required } from 'react-admin';

export const CourseCreate = () => (
    <Create>
        <SimpleForm >
            <TextInput source='title' validate={[required('The title is required')]} label="Title" />
            <TextInput source='imageSrc' validate={[required('The imageSrc is required')]} label="Image Source" />
        </SimpleForm>
    </Create>
);