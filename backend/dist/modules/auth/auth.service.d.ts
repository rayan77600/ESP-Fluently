import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User, UserRole } from '../../entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private usersRepository;
    private jwtService;
    constructor(usersRepository: Repository<User>, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<{
        access_token: string;
        user: {
            id: number;
            email: string;
            firstName: string;
            lastName: string;
            role: UserRole;
        };
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: number;
            email: string;
            firstName: string;
            lastName: string;
            role: UserRole;
        };
    }>;
    validateUser(userId: number): Promise<User | null>;
}
