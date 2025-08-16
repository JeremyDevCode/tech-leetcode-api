import { supabase } from '../config/supabase.js';

export const uploadFile = async (bucket, fileName, content) => {
    try {
        const { error } = await supabase.storage
            .from(bucket)
            .upload(fileName, Buffer.from(content), {
                contentType: 'text/yaml',
                upsert: true
            });

        if (error) throw error;

        const { data: publicUrlData } = supabase.storage
            .from(bucket)
            .getPublicUrl(fileName);

        return publicUrlData.publicUrl;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw new Error(`Failed to upload file: ${fileName}`);
    }
};

export const getYamlFile = async (bucket, fileName) => {
    try {
        const { data, error } = await supabase.storage
            .from(bucket)
            .download(fileName);

        if (error) {
            console.error(error);
            return null;
        }

        if (!data) {
            return null;
        }

        const text = await data.text();
        return text;
    } catch (error) {
        console.error('Error retrieving file:', error);
        throw new Error(`Failed to retrieve file: ${fileName}`);
    }
};

export const listFiles = async (bucket) => {
    try {
        const { data: files, error } = await supabase.storage.from(bucket).list();

        if (error) throw error;

        return files.filter(file => file.name !== '.emptyFolderPlaceholder');
    } catch (error) {
        console.error('Error listing files:', error);
        throw new Error(`Failed to list files in bucket: ${bucket}`);
    }
};
