export type JobApiResponse = {
  data: {
    Date: Date;
    Description: string;
    Title: string;
    JobType: string;
    Location: string;
    Rate: number;
    UserID: number;
  }    
  message: string;     
};