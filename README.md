# Vyle

## Introduction

Vyle is a library that provides an interface to interact with a remote service for managing files and projects. It utilizes Axios to make HTTP requests to the remote server and provides methods to perform various operations related to files and projects.

## Installation

To use Vyle, you need to have Axios installed as it is a peer dependency. You can install both Vyle and Axios using npm or yarn:

```bash
npm install vyle
```

or

```bash
yarn add vyle
```

## Usage

To use Vyle, you must import the library and create an instance of it by providing the necessary authentication token. The token is required for authorization purposes when making requests to the remote server.

```typescript
import Vyle from "vyle";

const authToken = "YOUR_AUTH_TOKEN";
const vyle = new Vyle(authToken);
vyleInstance
  .init()
  .then((project) => {
    console.log("Current Project:", project);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

## Types

Vyle provides several interfaces and types that you can use to interact with the data returned by its methods.

### VyleFile

Represents a file object with the following properties:

- `id`: A string representing the unique identifier of the file.
- `name`: A string representing the name of the file.
- `originalName`: A string representing the original name of the file when it was uploaded.
- `size`: A number representing the size of the file in bytes.
- `type`: A string representing the file type or MIME type.
- `url`: A string representing the URL to access the file.
- `tempUrl`: A string representing the temporary URL of the file (if applicable).
- `createdAt`: A Date object representing the date and time when the file was created.

### Meta

Represents metadata information with the following properties:

- `total`: A number representing the total number of items.
- `perPage`: A number representing the number of items per page.
- `page`: A number representing the current page.
- `totalPages`: A number representing the total number of pages.
- `nextPage`: (Optional) A number representing the next page number.
- `prevPage`: (Optional) A number representing the previous page number.
- `size`: A number representing the size of the items.

### Result

Represents a result object with the following properties:

- `metas`: A Meta object containing metadata information about the result.
- `datas`: An array of VyleFile objects representing the list of files returned by the request.

### Project

Represents a project object with the following properties:

- `id`: A string representing the unique identifier of the project.
- `fileMetas`: An object containing metadata information about the project's files with properties:
  - `total`: A number representing the total number of files in the project.
  - `perPage`: A number representing the number of files per page.
  - `totalPages`: A number representing the total number of pages of files.
  - `size`: A number representing the size of the files.

## Methods

### init()

```typescript
async init(): Promise<Project>
```

Initialize the Vyle instance by fetching the current project information. It must be called before using other methods that require the project context.

**Returns:** A Promise that resolves to a Project object representing the current project.

### remove()

```typescript
async remove(): Promise<any>
```

Remove the current project.

**Returns:** A Promise that resolves with the response from the server after removing the project.

### file.list()

```typescript
async file.list({
  page,
  perPage,
  expiresIn,
}: {
  page?: number;
  perPage?: number;
  expiresIn?: string | number;
}): Promise<Result>
```

Get a list of files for the current project.

**Parameters:**

- `page` (Optional): A number representing the page number to fetch (default is 1).
- `perPage` (Optional): A number representing the number of files per page (default is 10).
- `expiresIn` (Optional): A string or number representing the expiration time for temporary URLs of the files (if applicable).

**Returns:** A Promise that resolves to a Result object containing metadata information and an array of VyleFile objects representing the list of files.

### file.remove()

```typescript
async file.remove(file: string): Promise<any>
```

Remove a file from the current project.

**Parameters:**

- `file`: A string representing the unique identifier of the file to remove.

**Returns:** A Promise that resolves with the response from the server after removing the file.

### file.add()

```typescript
async file.add(files: File[]): Promise<any>
```

Add files to the current project.

**Parameters:**

- `files`: An array of File objects representing the files to add.

**Returns:** A Promise that resolves with the response from the server after adding the files.

### static addProject()

```typescript
static async addProject(): Promise<Vyle>
```

Create a new project and initialize a new Vyle instance for the project.

**Returns:** A Promise that resolves to a new Vyle instance for the newly created project.

## Example

Here's an example of how to use Vyle:

```typescript
import Vyle from "vyle";

const authToken = "YOUR_AUTH_TOKEN";
const vyle = new Vyle(authToken);

(async () => {
  try {
    await vyle.init();
    console.log("Current Project:", vyle.project);

    const result = await vyle.file.list({ page: 1, perPage: 5 });
    console.log("Files:", result.datas);

    // Add files
    const filesToAdd = [
      /* Array of File objects */
    ];
    await vyle.file.add(filesToAdd);

    // Remove a file
    const fileIdToRemove = "file_id_to_remove";
    await vyle.file.remove(fileIdToRemove);

    // Remove the project
    await vyle.remove();
  } catch (error) {
    console.error("Error:", error);
  }
})();
```

## Conclusion

Vyle simplifies the interaction with the remote service for file and project management by providing a convenient API through Axios requests. Use the methods and types provided in this documentation to effectively work with the Vyle library and manage your files and projects seamlessly.
