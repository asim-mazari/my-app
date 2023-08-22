import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyInformation } from '../entity/companyInformation';
import { companyInformationDto } from '../dto/companyInformationDto';

@Injectable()
export class companyServices {
  constructor(
    @InjectRepository(CompanyInformation) private readonly companyInformationRepository: Repository<CompanyInformation>,
  ) {}

  async CompanyInformation(companyInfo: companyInformationDto): Promise<CompanyInformation> {
    const newInfo = this.companyInformationRepository.create(companyInfo);
    return await this.companyInformationRepository.save(newInfo);
  }

  async getCompanyInformationById(id: number): Promise<CompanyInformation | undefined> {
    return this.companyInformationRepository.findOne({ where: { id } });
  }

  async updateCompanyInformation(id: number, updatedInfo: companyInformationDto): Promise<void> {
    await this.companyInformationRepository.update(id, updatedInfo);
  }

  async deleteCompanyInformation(id: number): Promise<CompanyInformation | null> {
    const companyInfo = await this.companyInformationRepository.findOne({ where: { id } });
    if (companyInfo) {
      await this.companyInformationRepository.remove(companyInfo);
      return companyInfo;
    }
    return null;
  }

  async getAllCompanyInformation(): Promise<CompanyInformation[]> {
    return this.companyInformationRepository.find();
  }

}
