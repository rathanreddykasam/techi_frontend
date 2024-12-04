/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { ApiService } from '../../../services/api-services/api-service.service';

@Component({
  selector: 'uac-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent implements OnInit {
  @Input() data: any;
  postForm: FormGroup;
  banner: File | null = null;
  logo: File | null = null;
  user: any;
  bannerPreview: string | ArrayBuffer | null = null; // Preview for file1
  logoPreview: string | ArrayBuffer | null = null; // Preview for file2
  branchControl = new FormControl();
  categoryControl = new FormControl();
  teamControl = new FormControl();

  teamList: any[] = [
    { key: 1, value: '1 - 10 mems' },
    { key: 2, value: '11 - 50 mems' },
    { key: 3, value: '51 - 100 mems' },
    { key: 3, value: '101 - 500 mems' },
    { key: 3, value: '501 - 1000 mems' },
  ];

  branchList: any[] = [
    { key: 1, value: 'Computer Science & Engineering' },
    { key: 2, value: 'Electronic & Electrical Engineering' },
    { key: 3, value: 'Civil Engineering' },
  ];

  categoryList: any[] = [
    { key: 1, branchId: 1, value: 'Computer Science & Engineering' },
    { key: 2, branchId: 2, value: 'Electronic & Electrical Engineering' },
    { key: 3, branchId: 3, value: 'Civil Engineering' },
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private http: ApiService
  ) {
    this.user = this.authService.getUserDetails();
  }
  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.branchControl = new FormControl(this.data?.branch_id);
    this.categoryControl = new FormControl(this.data?.category_id);
    this.teamControl = new FormControl(this.data?.team_size);
    this.postForm = this.fb.group({
      user_id: [this.data?.user_id],
      branch_id: this.branchControl,
      category_id: this.categoryControl,
      heading: [this.data?.heading],
      bannerFile: [this.data?.bannerFile],
      logoFile: [this.data?.logoFile],
      tagline: [this.data?.tagline],
      Intro: [this.data?.Intro],
      story: [this.data?.story],
      site_link: [this.data?.site_link],
      video: [this.data?.video],
      video_key: [this.data?.video_key],
      team_size: this.teamControl,
      some_text: [this.data?.some_text],
      status: [this.data?.status],
      post_as: [this.data?.post_as ? true : false],
    });
  }

  onFileSelected(event: Event, controlName: string): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file: File = fileInput.files[0];
      //const file: File = event.target.files[0];
      this.postForm.patchValue({ [controlName]: file });
      this.postForm.get(controlName)?.updateValueAndValidity();
      console.log(`${controlName} selected:`, file.name);

      const reader = new FileReader();
      reader.onload = () => {
        if (controlName === 'bannerFile') {
          this.bannerPreview = reader.result;
        } else if (controlName === 'logoFile') {
          this.logoPreview = reader.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(value: boolean = false): void {
    if (value) {
      this.postForm.patchValue({
        status: 1,
        user_id: this.user.id,
      });
    } else {
      this.postForm.patchValue({
        status: 0,
        user_id: this.user.id,
      });
    }
    if (this.postForm.valid) {
      const formData = new FormData();
      formData.append('user_id', this.postForm.get('user_id')?.value);
      formData.append('branch_id', this.postForm.get('branch_id')?.value);
      formData.append('category_id', this.postForm.get('category_id')?.value);
      formData.append('heading', this.postForm.get('heading')?.value);
      formData.append('tagline', this.postForm.get('tagline')?.value);
      formData.append('bannerFile', this.postForm.get('bannerFile')?.value);
      formData.append('logoFile', this.postForm.get('logoFile')?.value);
      formData.append('tagline', this.postForm.get('tagline')?.value);
      formData.append('Intro', this.postForm.get('Intro')?.value);
      formData.append('story', this.postForm.get('story')?.value);
      formData.append('site_link', this.postForm.get('site_link')?.value);
      formData.append('team_size', this.postForm.get('team_size')?.value);
      formData.append('some_text', this.postForm.get('some_text')?.value);
      formData.append('status', this.postForm.get('status')?.value);
      formData.append(
        'post_as',
        this.postForm.get('post_as')?.value ? this.user?.id : 0
      );
      console.log('FormData:', formData);

      //

      // Send formData to your backend via HttpClient
      this.http
        .post('posts/create', formData)
        .subscribe((response) => console.log(response));
    } else {
      console.log('Form is invalid!');
    }
  }

  validate() {
    const controls = this.postForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        return { error: true };
      }
    }
    return null;
  }
}
