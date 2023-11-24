export interface WebScrapingServiceResponse {
    status: number,
    statusMessage: string,
    message: string,
    screenshot?: Screenshot
}

export interface Screenshot {
    file: string,
    path: string
}