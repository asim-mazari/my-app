import { Controller, Post, Body, HttpStatus ,Delete,Param,Get } from '@nestjs/common';
import { companyServices } from '../Services/companyservice';
import { companyInformationDto } from '../dto/companyInformationDto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyInfoService: companyServices) {}

  @Post()
  async createOrUpdateCompanyInformation(@Body() companyInfoDto: companyInformationDto) {
    try {
      const existingCompanyInfo = await this.companyInfoService.getCompanyInformationById(companyInfoDto.id);
      if (existingCompanyInfo) {
        // Update the existing entry
        await this.companyInfoService.updateCompanyInformation(companyInfoDto.id, companyInfoDto);
        return {
          message: 'Company information updated successfully',
        };
      } else {
        const createdCompanyInfo = await this.companyInfoService.CompanyInformation(companyInfoDto);
        return {
          message: 'Company information created successfully',
          data: createdCompanyInfo,
        };
      }
    } catch (error) {
      return {
        message: 'Error creating or updating company information',
        error: error.message,
      };
    }
  }
  @Delete('delete')
  async deleteCompanyInformation(@Param('id') id: number) {
    try {
      const existingCompanyInfo = await this.companyInfoService.getCompanyInformationById(id);

      if (!existingCompanyInfo) {
        return {
          message: 'Company information not found',
        };
      }
      await this.companyInfoService.deleteCompanyInformation(id);
      return {
        message: 'Company information deleted successfully',
      };
    } catch (error) {
      return {
        message: 'Error deleting company information',
        error: error.message,
      };
    }
  }  
  @Get('fetchinfo')
  async getCompanyInformation() {
    try {
      const companyInfo = await this.companyInfoService.getAllCompanyInformation();
      return {
        message: 'Company information retrieved successfully',
        data: companyInfo,
      };
    } catch (error) {
      return {
        message: 'Error retrieving company information',
        error: error.message,
      };
    }
  }
}



